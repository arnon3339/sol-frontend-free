import {
	bodyAttData,
	headAttData, 
	eyesAttData, 
	mouthAttData, 
	clotheAttData, 
	eyesAccAttData, 
	mouthAccAttData} from '@/modules/attributes';

export function genHexAtt(att){
	let nonZeroIndex = 0;
	for(let i = 0; i < att.length; i++) {
		if (att[i]) break;
		nonZeroIndex++;
	}
	let attBits = att.slice(nonZeroIndex).map(e => e? "1": "0").join('');
	if ((attBits.length)%4 != 0) {
		attBits = Array.from({length: 4 - ((attBits.length)%4)}).map(e => "0").join('')
			+ attBits;
	}
	const result = Array.from({length: parseInt((attBits.length)/4)}).map((e, i) => {
		return parseInt(attBits.slice(i*4, (i*4) + 4), 2).toString(16);
	}).join('');
	return result;
}

export function genBitsAtt(attLen, attData){
	const bits = attData.split("").map((e, i) => {
		const aBitsString = parseInt(e, 16).toString(2);
		return [...Array.from({length: 4 - aBitsString.length}).map(_ => "0"),
			aBitsString].join('');
	}).join('');
	const result = [...(Array.from({length: attLen - bits.length}).map(_ => false)), 
		...(bits.split("").map(e => e === "1"? true: false))]
	if (attLen < bits.length) {
		const new_result = result.slice(bits.length - attLen);
		return new_result;
	}
	return result; 
}

export function genHexSingleAtt(attName, attValue){
	const att_ref = {
		body: bodyAttData,
		head: headAttData,
		eyes: eyesAttData,
		mouth: mouthAttData,
		clothe: clotheAttData,
		eyesacc: eyesAccAttData,
		mouthacc: mouthAccAttData
	};
  const the_att = att_ref[attName];
  const att_index = the_att.findIndex((x) => x === attValue);
  const binsValue = att_index != -1? Array.from({length: the_att.length})
    .map((_, i) => i === att_index? 1: 0)
    :Array.from({length: the_att.length})
    .map(_ => 0);
  return genHexAtt(binsValue);
}
