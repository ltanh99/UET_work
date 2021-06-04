require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { StreamChat } = require('stream-chat');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize Stream Chat SDK

const serverSideClient = new StreamChat(
  "uzgje3xjbrgq",
  "hdff87ma8j529zqsef54szxuqj44c552aqtskjcpqnzqptjzws4etsu2p7shn7fn"
);

app.post('/create-team', async (req,res) => {
  const {channelId} = req.body;
  const {channelName} = req.body;
  const channel1 = serverSideClient.channel('team', channelId, {
    name: channelName,
    created_by: admin,
  });

  try {
    // await channel.create();
    // await channel.addMembers([username, 'admin']);
    await channel1.create();
    await channel1.addMembers([username, 'admin']);
  } catch (err) {
    console.log(err);
  }

  return res
    .status(200)
    .json({ message: "create channel success" });
})

app.post('/join', async (req, res) => {
  const { username } = req.body;
  const {channelId} = req.body;
  const {channelName} = req.body;
  const token = serverSideClient.createToken(username);
  try {
    await serverSideClient.updateUser(
      {
        id: username,
        name: username,
      },
      token
    );
  } catch (err) {
    console.log(err);
  }

  const admin = { id: 'admin' };
  // const channel = serverSideClient.channel('team', 'talkshop', {
  //   name: 'Talk Shop',
  //   created_by: admin,
  // });

  const channel = serverSideClient.channel('team', channelId, {
    name: channelName,
    created_by: admin,
  });

  try {
    // await channel.create();
    // await channel.addMembers([username, 'admin']);
    await channel.create();
    await channel.addMembers([username, 'admin']);
  } catch (err) {
    console.log(err);
  }

  return res
    .status(200)
    .json({ user: { username }, token, api_key: "uzgje3xjbrgq" });
});

const server = app.listen(5500, () => {
  const { port } = server.address();
  console.log(`Server running on PORT ${port}`);
});

