
const SHA256 = require('crypto-js/sha256');

class Block {
	constructor(index, timestmp, data, prevhash=""){
		this.index = index;
		this.timestmp = timestmp;
		this.data = data;
		this.prevhash = prevhash;
		this.hash = this.calchash();
	}

	calchash(){
		let ss = this.index+this.timestmp+this.prevhash+JSON.stringify(this.data)
		return SHA256(ss).toString();
	}

}

class Blockchain {
	constructor(){
		this.chain = [this.createGenesis()];
	}

	createGenesis(){
		return new Block(0, "13/07/2020", "genesis block henry cash", "0");
	}

	getlastblock(){
		return this.chain[this.chain.length - 1];
	}
	addblock(newblock){
		newblock.prevhash = this.getlastblock().hash;
		newblock.hash = newblock.calchash();
		this.chain.push(newblock);
	}

	isvalid(){
		for (let i=1; i<this.chain.length; i++){
			const current = this.chain[i];
			const prev = this.chain[i-1];

			if (current.hash !== current.calchash()){
				console.log('=================================')
				console.log('block id: ', i)
				console.log('current hash validation error')
				console.log('=================================')
				return false;
			}
			if (prev.hash !== current.prevhash){
				console.log('=================================')
				console.log('block id: ', i)
				console.log('previous hash validation error')
				console.log('=================================')
				return false;
			}
		}
		console.log('hash validation completed OK')
		return true;		
	}
	ss


}

let henryCoin = new Blockchain();
henryCoin.addblock(new Block(1, "15/07/2020", {amt: 400000}));
henryCoin.addblock(new Block(2, "10/08/2020", {amt: 700000}));
henryCoin.addblock(new Block(3, "12/09/2020", {amt: 1200000}));

//tampering
// henryCoin.chain[2].data = {amt: 1500000};
// henryCoin.chain[2].hash  = henryCoin.chain[3].calchash();

//validating
if (henryCoin.isvalid()) {
	console.log('henrycoin is valid');
	console.log('=================================')
}else{
	console.log('coin chain not valid');	
	coinnsole.log('=================================')
}

console.log(JSON.stringify(henryCoin, null, 4));


