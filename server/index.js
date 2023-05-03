const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  // Private Key fef6cf84a185c37500963f73a83309c71eeabb5529d76e80af0f488ecee33ca5
  // Public Key 02069090221674c4a69d1db89852fb1fc34e6a0ebe3776e2299ebca18d673e7935
  '0x77c35d428d8f3f47defc7b126062cde3ee0860dbd3fb63dcacd85b9b53781fdf': 100,

  // Private Key c02ca46c9312d5785d55e8fa47f2eaea979634e675dfc51cdf98b17a0d88171b
  // Public Key 035b46f194c63a3aaa74ad8dd4ac59b6b0dee475457868214f63710f96ca3a3a10
  '0x14b3a2ebaba0645ce12ed6a8e88b4dd67de16b3f49ea1600d5a20d775a817953': 50,

  // Private Key 00145f7794a764e3f2f7b273994b16ad0a4b6e67f8a60b3024c1802503f72f0c
  // Public Key 0328e1486881f6bee7945b8238789d70f3960d500556661fe58e89ae688da5f938
  '0x4b456712c1f9d44bd6e6f01adad323886f5c44421035a06baef88c306b42bf1c': 75,
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
