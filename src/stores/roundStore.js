import {autorun, makeAutoObservable} from 'mobx'
import axios from 'axios'
import {getStore, useStore} from "./index.js";
import {getUserStore} from "./userStore.js";
import moment from "moment";

export class RoundStore {
    golfInfo = {};
    players = [];
    currentHole = 1;
    inputHole = 1;
    isHydrated = false; // 🔥 중요
    constructor() {
        makeAutoObservable(this);
        this.hydrate();
        autorun(() => {
            if(!this.isHydrated) return;
            localStorage.setItem("roundStore", JSON.stringify({
                golfInfo: this.golfInfo,
                players: this.players,
                currentHole: this.currentHole,
                inputHole: this.inputHole,
                strokeRecords: this.strokeRecords,
                moneyRecords: this.moneyRecords,
            }));
        });

    }

    hydrate() {
        const saved = localStorage.getItem("roundStore");
        if(saved) {
            const data = JSON.parse(saved);
            this.golfInfo = data.golfInfo;
            this.players = data.players;
            this.currentHole = data.currentHole;
            this.inputHole = data.inputHole;
            this.strokeRecords = data.strokeRecords;
            this.moneyRecords = data.moneyRecords;
        }
        this.isHydrated = true;
    }
    clear() {
        this.golfInfo = {};
        this.players = [];
        this.currentHole = 1;
        this.inputHole = 1;
        this.strokeRecords = [];
        this.moneyRecords = [];
    }


    async create() {
        const data = {
            type: this.golfInfo.type, golfId: this.golfInfo.id, frontCourseId: this.golfInfo.frontCourse.id,
            backCourseId: this.golfInfo.backCourse.id, baseMoney: this.golfInfo.baseMoney, date: moment(this.golfInfo.date).format('YYYY-MM-DD'),
            userIds: this.players.map(player => player.id), writeUserId: getUserStore().me.id
        }
        const res = await axios.post('/round/start', data);
        const round = res.data.data.round;
        return round.id;

    }

    async fetchFromId(roundId) {
        const res = await axios.get(`/round?roundId=${roundId}`, );
        const round = res.data.data.round;
        this.golfInfo = {
            roundId: round.id, type: round.type, golf: round.golf, frontCourse: round.frontCourse, backCourse: round.backCourse,
            baseMoney: round.baseMoney, date: round.date,
            doubleHole: round.doubleHole
        }
        this.strokeRecords= round.strokeRecords;
        this.moneyRecords= round.moneyRecords;
        // this.golfInfo = round;
        for(let i=1; i <= 18; i++) {
            this.currentHole = i;
            this.inputHole = i;
            if(round.strokeRecords[0][`hole${i}`] === null || round.strokeRecords[0][`hole${i}`] === undefined) {
                break;
            }
        }
        const playerIds = this.strokeRecords.map((strokeRecord) => strokeRecord.userId);
        await getUserStore().getAllUsers();
        this.players = [];
        for(const user of getUserStore().allUsers) {
            if(playerIds.includes(user.id)) {
                this.players.push(user);
            }
        }
    }

    setGolfInfo(type, golf, frontCourse, backCourse, baseMoney, date) {
        this.golfInfo = {
            type, id: golf.id, name: golf.name, location: golf.location,
            frontCourse, backCourse, baseMoney, date
        }

    }

    setPlayers(players) {
        this.players = players;
    }

    setInputHole(hole) {
        this.inputHole = hole;
    }

    async saveHoleScore(strokeRecords) {
        const holeRecords = [];
        for(const userId in strokeRecords) {
            const score = strokeRecords[userId];
            holeRecords.push({roundId: this.golfInfo.roundId, score: score, userId, number: this.inputHole})
        }
        const res = await axios.patch('/round/record', {holeRecords});
        this.strokeRecords = res.data.data.strokeRecords;
        this.moneyRecords = res.data.data.moneyRecords;
    }

    getHolestrokeRecords(hole) {
        const result = {};

        this.players.forEach(p => {
            result[p.id] = p.strokeRecords?.[hole];
        });

        return result;
    }

    getStroke(number) {
        const result = {};
        const r = this.strokeRecords.map(strokeRecord => {
            result[strokeRecord.userId] = strokeRecord[`hole${number}`]
        });
        return result;
    }

    nextHole() {
        if (this.currentHole < 18) {
            this.currentHole += 1;
            this.inputHole = this.currentHole;
        }
    }

    async finish() {
        await axios.post('/round/finish', {roundId: this.golfInfo.roundId})
    }
    get isLastHole() {
        return this.currentHole === 18;
    }
}

export const useRoundStore = () => {
    return useStore().roundStore;
}

export const getRoundStore = () => {
    return getStore().roundStore;
}
