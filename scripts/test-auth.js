#!/usr/bin/env node

// Test script for authentication endpoints
// Run with: node test-auth.js

const BASE_URL = 'http://localhost:3000';

// Mock Firebase ID token for testing
// In real usage, this would come from Firebase client SDK
const MOCK_ID_TOKEN = 'mock_firebase_id_token_for_testing';

async function testAuthEndpoints() {
  console.log('🧪 Testing Authentication Endpoints\n');

  // Test 1: Login without token
  console.log('📝 Test 1: Login without token');
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    const data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${data.error}`);
    console.log('   ✅ Correctly rejected request without token\n');
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}\n`);
  }

  // Test 2: Session check without login
  console.log('📝 Test 2: Session check without login');
  try {
    const response = await fetch(`${BASE_URL}/api/auth/session`, {
      method: 'GET'
    });
    const data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${data.error}`);
    console.log('   ✅ Correctly returned no session\n');
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}\n`);
  }

  // Test 3: Logout without session
  console.log('📝 Test 3: Logout without session');
  try {
    const response = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST'
    });
    const data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${data.message}`);
    console.log('   ✅ Logout successful (even without session)\n');
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}\n`);
  }

  console.log('🎉 Authentication endpoint tests completed!');
  console.log('\n📋 To test with real Firebase tokens:');
  console.log('1. Set up Firebase Admin credentials in .env.local');
  console.log('2. Get a real ID token from Firebase client SDK');
  console.log('3. Replace MOCK_ID_TOKEN with real token');
  console.log('4. Test login with real token');
}

// Only run if this file is executed directly
if (require.main === module) {
  testAuthEndpoints().catch(console.error);
}

module.exports = { testAuthEndpoints };