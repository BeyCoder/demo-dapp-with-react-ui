import React, {useCallback, useState} from 'react';
import ReactJson from 'react-json-view';
import './style.scss';
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {Address, beginCell, toNano} from "ton-core";
import {JettonMaster, TonClient} from "ton";

const defaultTx = {
	validUntil: 0,
	messages: [
		{
			address: '',
			amount: toNano("0.15").toString(),
			payload: ""
		},
	],
};

export function TxForm() {
	const [tx, setTx] = useState(defaultTx);
	const wallet = useTonWallet();
	const [tonConnectUi] = useTonConnectUI();

	if(wallet) {
		const client = new TonClient({ endpoint: "https://toncenter.com/api/v2/jsonRPC" });
		const jetton = Address.parseRaw("0:3a4d2191094e3a33d4601efa51bb52dc5baa354516e162b7706955385f8144a7");
		const masterContract = JettonMaster.create(jetton);
		const master = client.open(masterContract);


		const contractAddress = Address.parse("EQDtbJhnJjdxYR8l4C1rQra_kzPR8_sBvtk0TonNxE5jAz6S");
		master.getWalletAddress(Address.parseRaw(wallet.account.address)).then(addr => {
			const message = beginCell()
				.storeUint(0xf8a7ea5, 32)
				.storeUint(0, 64)
				.storeCoins(10 * Math.pow(10, 5))
				.storeAddress(contractAddress)
				.storeAddress(contractAddress)
				.storeUint(0, 1)
				.storeCoins(toNano("0.1"))
				.storeUint(0, 1) // or 1
				.endCell();

			const newTx = {
				validUntil: Date.now() + 1000000,
				messages: [
					{
						address: addr.toString(),
						amount: toNano("0.15").toString(),
						payload: message.toBoc().toString("base64")
					},
				],
			};

			setTx(newTx);
		});
	}

	return (
		<div className="send-tx-form">
			<h3>FCK Lottery</h3>
			{wallet && tx.validUntil > Date.now() ? (
				<button onClick={() => tonConnectUi.sendTransaction(tx)}>
					Play for 10 FCK
				</button>
			) : (
				<button onClick={() => tonConnectUi.connectWallet()}>Connect wallet to start to play</button>
			)}
		</div>
	);
}
