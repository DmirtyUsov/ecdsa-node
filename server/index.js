const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  // Private Key 08769c7414c28d2342c7cd1d7d76bcddbf7cd073e13b4a0bf6780b80f5dd6bf6
  // Public Key 03f3eac9d326d7783233440aaa88978f52360b359e716559c265d61581c73893d7
  '0x6948c6d216f7d2f4a570bd6d6fde16b726a3c693': 100,

  // Private Key 5c60494147952936571a885336af9c54214a6760c90d3417a487983a4b28c2ab
  // Public Key 0298d219419911644184f32fd7bba54843ab7d1ad4b129214e1af1c791082d23fc
  '0xe0ca679d7472b7b00d8251d123ecbd9457516816': 50,

  // Private Key 81f71c7da82debc729588255ee85d544587022c69b0bbfae32eae7ee66296716
  // Public Key 0346e731265fc94639f4775703930cbe20d863a34019b3c58ec825d4b33a3d95ab
  '0xd2a69859816fb8b304119c67aeb0106c49dbbd82': 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
