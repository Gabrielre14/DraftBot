import { Fighter } from "../../../fighter/Fighter";
import {
	attackInfo, FightActionController, statsInfo
} from "../../FightActionController";
import { FightActionFunc } from "../../../../../data/FightAction";
import {
	customMessageActionResult, FightStatBuffed
} from "../../../../../../../Lib/src/types/FightActionResult";
import { FightStatModifierOperation } from "../../../../../../../Lib/src/types/FightStatModifierOperation";
import { FightConstants } from "../../../../../../../Lib/src/constants/FightConstants";

const use: FightActionFunc = (sender, _receiver, fightAction) => {
	const count = sender.fightActionsHistory.filter(action => action.id === FightConstants.FIGHT_ACTIONS.PLAYER.RESTING).length;

	sender.nextFightAction = null;

	// Recovered energy is reduced after the fourth use of this action
	const recoveredEnergy = Math.round(FightActionController.getAttackDamage(getStatsInfo(sender), sender, getAttackInfo(), true) / (count < 4 ? 1 : 4));

	const result = customMessageActionResult();
	FightActionController.applyBuff(result, {
		selfTarget: true,
		stat: FightStatBuffed.ENERGY,
		operator: FightStatModifierOperation.ADDITION,
		value: recoveredEnergy
	}, sender, fightAction);
	return result;
};

export default use;

function getAttackInfo(): attackInfo {
	return {
		minDamage: 15,
		averageDamage: 60,
		maxDamage: 110
	};
}

function getStatsInfo(sender: Fighter): statsInfo {
	return {
		// We are comparing the max energy to the current energy to get the amount of recovered energy
		attackerStats: [sender.getMaxEnergy()],
		defenderStats: [sender.getEnergy()],
		statsEffect: [1]
	};
}
