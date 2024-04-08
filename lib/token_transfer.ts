import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { decode } from 'bs58';
import * as dotenv from 'dotenv';
dotenv.config();

export async function transferSPLToken(
  recipientAddress: string,
): Promise<void> {
  const tokenMintAddress = "GwuKfPbKawyBwGPSnVzFcXak6cYSuzQsb59HjmqMiD5u";
  const amount = 10;
  console.log("aaaa");
  console.log(process.env);
  console.log("secret_key:"+process.env.SENDER_SECRET_KEY);
  const senderSecretKey = decode(process.env.SENDER_SECRET_KEY);
  const RPC_URL = process.env.RPC_URL;

  const senderKeypair = Keypair.fromSecretKey(senderSecretKey);
  const recipientPublicKey = new PublicKey(recipientAddress);
  const tokenMintPublicKey = new PublicKey(tokenMintAddress);

  const connection = new Connection(RPC_URL, "confirmed");

  const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    senderKeypair,
    tokenMintPublicKey,
    recipientPublicKey
  );

  const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    senderKeypair,
    tokenMintPublicKey,
    senderKeypair.publicKey
  );

  await transfer(
    connection,
    senderKeypair,
    senderTokenAccount.address,
    receiverTokenAccount.address,
    senderKeypair.publicKey,
    amount * 1000000000,
  );
}

