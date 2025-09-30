import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import db, { CName } from '@/services/mongodb';
import { getSessionFromRequest, clearSessionCookie } from '@/lib/session';
import { UserAccount } from '@/contexts/AuthContext';

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { reason, feedback } = await request.json().catch(() => ({ reason: '', feedback: '' }));

    // Log deletion intent
    try {
      await db.collection('userDeletionLogs').insertOne({
        uid: session.uid,
        email: session.email,
        reason: reason || null,
        feedback: feedback || null,
        createdAt: new Date()
      });
    } catch (e) {
      console.error('Failed to log user deletion', e);
    }

    // Remove user profile
    try {
      await db.collection<UserAccount>(CName.User).deleteOne({ uid: session.uid });
    } catch (e) {
      console.error('Failed to delete user document', e);
    }

    // Attempt to delete auth user (Firebase Admin) - ignore if fails
    try {
      await adminAuth.deleteUser(session.uid);
    } catch (e: any) {
      console.error('Failed to delete firebase auth user', e?.message || e);
    }

    const response = NextResponse.json({ success: true, message: 'Account deleted' });
    clearSessionCookie(response);
    return response;
  } catch (error) {
    console.error('Account deletion error', error);
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
}
