import { FightActionFunc } from "../../../../../data/FightAction";
import {
	defaultFightActionResult, FightStatBuffed
} from "../../../../../../../Lib/src/types/FightActionResult";
import { FightStatModifierOperation } from "../../../../../../../Lib/src/types/FightStatModifierOperation";
import { FightActionController } from "../../FightActionController";


const use: FightActionFunc = (sender, receiver, fightAction) => {
	const result = defaultFightActionResult();
	const receiverBuffDetails = {
		selfTarget: false,
		stat: FightStatBuffed.DAMAGE_BOOST,
		value: 0,
		operator: FightStatModifierOperation.MULTIPLIER,
		duration: 1
	};
	FightActionController.applyBuff(result, receiverBuffDetails, receiver, fightAction);
	const senderBuffDetails = {
		selfTarget: true,
		stat: FightStatBuffed.DAMAGE_BOOST,
		value: 1.4,
		operator: FightStatModifierOperation.MULTIPLIER,
		duration: 1
	};
	FightActionController.applyBuff(result, senderBuffDetails, sender, fightAction);

	return {
		...result,
		customMessage: true
	};
};

export default use;
