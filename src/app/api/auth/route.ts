import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { clearSessionCookie, createSession, getSessionFromRequest, setSessionCookie } from '@/lib/session';
import db, { CName } from '@/services/mongodb';
import { UserAccount } from '@/contexts/AuthContext';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json(
        { error: 'Firebase ID token is required' },
        { status: 400 }
      );
    }

    // Verify Firebase ID token
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch (error) {
      console.error('Firebase token verification failed:', error);
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const { uid, email, name, picture, email_verified } = decodedToken;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists in MongoDB
    const userCollection = db.collection<UserAccount>(CName.User);
    let userProfile = await userCollection.findOne({ email });

    if (!userProfile) {
      // Create new user in MongoDB
      const nameParts = (name || email.split('@')[0]).split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const newUserProfile: UserAccount = {
        firstName,
        lastName,
        displayName: `${firstName} ${lastName}`.trim(),
        uid,
        email,
        phone: '',
        address: '',
        city: '',
        country: '',
        dateOfBirth: '',
        gender: '',
        bio: '',
        photoURL: picture || '',
        emailVerified: email_verified || false,
        accountType: 'personal',
        systemRole: 'user'
      };

      try {
        const insertResult = await userCollection.insertOne(newUserProfile);
        userProfile = { ...newUserProfile, _id: insertResult.insertedId };
      } catch (error) {
        console.error('Error creating user in MongoDB:', error);
        return NextResponse.json(
          { error: 'Failed to create user account' },
          { status: 500 }
        );
      }
    } else {
      // Update photoURL if it has changed
      if (picture && userProfile.photoURL !== picture) {
        await userCollection.updateOne(
          { email },
          { $set: { photoURL: picture } }
        );
        userProfile.photoURL = picture;
      }
    }

    // Create session
    const sessionToken = await createSession(uid, email);

    // Create response with user data
    const response = NextResponse.json({
      success: true,
      user: {
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        displayName: `${userProfile.firstName} ${userProfile.lastName}`.trim(),
        uid: userProfile.uid,
        email: userProfile.email,
        phone: userProfile.phone,
        address: userProfile.address,
        city: userProfile.city,
        country: userProfile.country,
        dateOfBirth: userProfile.dateOfBirth,
        gender: userProfile.gender,
        bio: userProfile.bio,
        photoURL: userProfile.photoURL,
        emailVerified: userProfile.emailVerified || false,
        accountType: userProfile.accountType,
        systemRole: userProfile.systemRole || 'user'
      }
    });

    // Set session cookie
    setSessionCookie(response, sessionToken);

    return response;

  } catch (error) {
    console.error('Login error:', error);

    if (error instanceof Error) {
      // Handle specific Firebase errors
      if (error.message.includes('auth/id-token-expired')) {
        return NextResponse.json(
          { error: 'Token has expired. Please log in again.' },
          { status: 401 }
        );
      }

      if (error.message.includes('auth/invalid-id-token')) {
        return NextResponse.json(
          { error: 'Invalid authentication token.' },
          { status: 401 }
        );
      }

      if (error.message.includes('auth/user-not-found')) {
        return NextResponse.json(
          { error: 'User account not found.' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      {
        error: 'Internal server error during login',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {

  try {
    // Get session from request
    const session = await getSessionFromRequest(request);
    console.log('session data:', session);

    if (!session) {
      return NextResponse.json(
        { error: 'No active session' },
        { status: 401 }
      );
    }

    // Get user profile from MongoDB
    const userCollection = db.collection<UserAccount>(CName.User);
    const userProfile = await userCollection.findOne({ uid: session.uid });

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Return user data
    const response = NextResponse.json({
      success: true,
      user: {
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        displayName: `${userProfile.firstName} ${userProfile.lastName}`.trim(),
        uid: userProfile.uid,
        email: userProfile.email,
        phone: userProfile.phone,
        address: userProfile.address,
        city: userProfile.city,
        country: userProfile.country,
        dateOfBirth: userProfile.dateOfBirth,
        gender: userProfile.gender,
        bio: userProfile.bio,
        photoURL: userProfile.photoURL,
        emailVerified: userProfile.emailVerified || false,
        accountType: userProfile.accountType,
        systemRole: userProfile.systemRole || 'user'
      }
    });

    return response;
  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json(
      {
        error: 'Failed to verify session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get session from request
    const session = await getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json(
        { error: 'No active session' },
        { status: 401 }
      );
    }

    // Parse request body for updates
    const updates: Partial<UserAccount> = await request.json();

    // Validate updates (basic example, expand as needed)
    const allowedFields: (keyof UserAccount)[] = [
      'firstName', 'lastName', 'phone', 'address', 'city',
      'country', 'dateOfBirth', 'gender', 'bio', 'accountType'
    ];
    const updateData: Record<string, string | number | boolean | Date | undefined> = {};
    for (const field of allowedFields) {
      if (field in updates) {
        updateData[field] = updates[field] as UserAccount[typeof field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    // Update user profile in MongoDB
    const userCollection = db.collection<UserAccount>(CName.User); 
    const result = await userCollection.updateOne(
      { uid: session.uid },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      {
        error: 'Failed to update profile',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get current session (optional - for logging purposes)
    const session = await getSessionFromRequest(request);

    if (session) {
      console.log(`User ${session.email} logged out`);
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    // Clear session cookie
    clearSessionCookie(response);

    return response;

  } catch (error) {
    console.error('Logout error:', error);

    // Even if there's an error, we should still clear the cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    clearSessionCookie(response);
    return response;
  }
}