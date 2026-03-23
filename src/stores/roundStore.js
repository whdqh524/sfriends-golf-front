import {autorun, makeAutoObservable} from 'mobx'
import axios from 'axios'
import {getStore, useStore} from "./index.js";
import {getUserStore} from "./userStore.js";
import moment from "moment";

export class RoundStore {
    golfInfo = {};
    players = [];
    scores = [];
    currentHole = 1;
    isHydrated = false; // 🔥 중요
    constructor() {
        makeAutoObservable(this);
        this.hydrate();
        autorun(() => {
            if(!this.isHydrated) return;
            localStorage.setItem("roundStore", JSON.stringify({
                golfInfo: this.golfInfo,
                players: this.players,
                scores: this.scores,
                currentHole: this.currentHole,
            }));
        });

    }

    hydrate() {
        const saved = localStorage.getItem("roundStore");
        if(saved) {
            const data = JSON.parse(saved);
            this.golfInfo = data.golfInfo;
            this.players = data.players;
            this.scores = data.scores;
            this.currentHole = data.currentHole;
        }
        this.isHydrated = true;
    }
    clear() {
        this.golfInfo = {};
        this.players = [];
        this.scores = [];
        this.currentHole = 1;
    }


    async create() {
        const data = {
            type: this.golfInfo.type, golfId: this.golfInfo.id, frontCourseId: this.golfInfo.frontCourse.id,
            backCourseId: this.golfInfo.backCourse.id, baseMoney: this.golfInfo.baseMoney, date: moment(this.golfInfo.date).format('YYYY-MM-DD'),
            userIds: this.players, writeUserId: getUserStore().me.id
        }
        const res = await axios.post('/round/start', data);
        const round = res.data.data.round;
        return round.id;

    }

    async fetchFromId(roundId) {
        const res = await axios.get('/round', {roundId});
        const round = res.data.data.round;
        this.golfInfo = {
            type: round.type, golf: round.golf, frontCourse: round.frontCourse, backCourse: round.backCourse,
            baseMoney: round.baseMoney, date: round.date
        }
        for(let i=1; i <= 18; i++) {
            this.currentHole = i;
            if(!round.strokeRecords[0][`hole${i}`]) {
                break;
            }
            const scoreData = [];
            for(let j=0; j<=round.strokeRecords.length; j++) {
                // const strokeRecord = {roundId, round.strokeRecords[j]
                // scoreData
            }

        }
        for(const strokeRecord of round.strokeRecords) {

        }

    }

    setGolfInfo(type, golf, frontCourse, backCourse, baseMoney, date) {
        this.golfInfo = {
            type, id: golf.id, name: golf.name, location: golf.location,
            frontCourse, backCourse, baseMoney, date
        }

    }

    setPlayers(players) {
        this.players = players.map(player => player.id);
    }

    nextHole() {
        if (this.currentHole < 18) {
            this.currentHole += 1;
        }
    }

    get isLastHole() {
        return this.currentHole === 18;
    }

    get totalScores() {
        const result = {};

        Object.values(this.scores).forEach(hole => {
            Object.entries(hole).forEach(([userId, score]) => {
                result[userId] = (result[userId] || 0) + score;
            });
        });

        return result;
    }
}

export const useRoundStore = () => {
    return useStore().roundStore;
}

export const getRoundStore = () => {
    return getStore().roundStore;
}
