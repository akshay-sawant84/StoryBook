const userName = "akshay84",
      password = "akshaysawant",
      dbName = "StoryBook"

module.exports = {
    GOOGLE_CLIENT_ID : "726408744030-h4cj7tntnt5m5u3psip2io6orm4ltah2.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET : "bn6Nv1x6UNFhsWjgUm3xRhdI",
    mongoURI : `mongodb://${userName}:${password}@node-shard-00-00-wav97.mongodb.net:27017,node-shard-00-01-wav97.mongodb.net:27017,node-shard-00-02-wav97.mongodb.net:27017/${dbName}?ssl=true&replicaSet=Node-shard-0&authSource=admin&retryWrites=true&w=majority`
}