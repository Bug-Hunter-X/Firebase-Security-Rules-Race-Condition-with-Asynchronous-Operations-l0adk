The solution involves using Promises or async/await to ensure the data is read before attempting an update:

```javascript
async function updateUserLastLogin(userId) {
  try {
    const snapshot = await firebase.database().ref('/users/' + userId).once('value');
    if (snapshot.exists()) {
      await firebase.database().ref('/users/' + userId).update({
        lastLogin: Date.now()
      });
    } else {
      console.log('User not found.');
    }
  } catch (error) {
    console.error('Error updating user data:', error);
  }
}

// Call the function
updateUserLastLogin(userId);
```

This corrected code uses `async/await` to ensure that the update happens only after the data is successfully read, eliminating the race condition.