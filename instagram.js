class Instagram {
  constructor() {
    // Space Complexity Big T = T(n+m) n = the size of the user base and m = number of photos added
    // reduce with Big O = O(m) m = the number of photos, m is chosen over n because number of photos will exceed number of users
    this.users = {};
    this.photos = [];
    // Write code here...
  }

  postPhoto(userId, photoId) {
    // Write code here...
    // Big O = O(1)
    this.photos.push([userId, photoId]);
  }

  getFeed(userId) {
    // Write code here...
    // Big O = O(n) where n = the length of photos
    let arr = [];
    let feed = 10;
    let photolength = this.photos.length - 1;
    while (feed > 0 && photolength >= 0) {
      const userPhotos = this.photos[photolength];
      if (userId === userPhotos[0]) {
        arr.push(userPhotos[1]);
        feed--;
      } else if (
        this.users[userId] &&
        this.users[userId].followings[userPhotos[0]]
      ) {
        arr.push(userPhotos[1]);
        feed--;
      }

      photolength--;
    }
    return arr;
  }

  follow(followerId, followeeId) {
    // Write code here..
    // Big O = O(1)
    this.users[followerId]
      ? (this.users[followerId].followings[followeeId] = true)
      : (this.users[followerId] = {
          followings: { [followeeId]: true },
          followers: {},
        });

    this.users[followeeId]
      ? (this.users[followeeId].followers[followerId] = true)
      : (this.users[followeeId] = {
          followings: {},
          followers: { [followerId]: true },
        });
  }

  unfollow(followerId, followeeId) {
    // Write code here..
    // Big O = O(1)
    this.users[followerId]
      ? delete this.users[followerId].followings[followeeId]
      : null;
    this.users[followeeId]
      ? delete this.users[followeeId].followers[followerId]
      : null;
  }
}

// Test Case
const instagram = new Instagram();

instagram.postPhoto(1, 11); // User with id=1 posts a photo with id=11
instagram.getFeed(1); // returns [11]
instagram.postPhoto(2, 12); // User with id=2 posts a photo with id=12
instagram.getFeed(1); // returns [11]
instagram.follow(1, 2); // User 1 follows User 2
instagram.postPhoto(3, 13); // User with id=3 posts a photo with id=13
instagram.postPhoto(3, 14); // User with id=3 posts a photo with id=14
instagram.postPhoto(3, 15); // User with id=3 posts a photo with id=15
instagram.postPhoto(3, 16); // User with id=3 posts a photo with id=16
instagram.postPhoto(3, 17); // User with id=3 posts a photo with id=17
instagram.postPhoto(3, 18); // User with id=3 posts a photo with id=18
instagram.postPhoto(3, 19); // User with id=3 posts a photo with id=19
instagram.getFeed(2); // returns [12]
instagram.follow(2, 3); // User 2 follows User 3
instagram.getFeed(2); // returns [19, 18, 17, 16, 15, 14, 13, 12]
instagram.postPhoto(4, 20); // User with id=4 posts a photo with id=20
instagram.postPhoto(4, 21); // User with id=4 posts a photo with id=21
instagram.postPhoto(4, 22); // User with id=4 posts a photo with id=22
instagram.postPhoto(4, 23); // User with id=4 posts a photo with id=23
instagram.follow(2, 4); // User 2 follows User 4
instagram.getFeed(2); // returns [23, 22, 21, 20, 19, 18, 17, 16, 15, 14]
instagram.unfollow(2, 3); // User 2 unfollows User 3
instagram.getFeed(2); // returns [ 23, 22, 21, 20, 12 ]
instagram.unfollow(2, 4); // User 2 unfollows User 4
instagram.getFeed(2); // returns [ 12 ]
