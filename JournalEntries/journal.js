var Entry = require('./entry');

module.exports = class Journal {
    constructor() {
        this.journal = [this.createGenesisEntry()];
        this.difficulty = 3; // this value will control how long it will take to mine a entry.
    }

    createGenesisEntry() {
        const genesisTime = new Date().toLocaleString();
        return new Entry(0, genesisTime, "Genesis Entry", "0");
    }

    getLatestEntry() {
        return this.journal[this.journal.length - 1];
    }

    getCurrentJournalLength() {
        return this.journal.length;
    }

    addEntry(newEntry) {
        newEntry.previousHash = this.getCurrentJournalLength().hash;
        newEntry.doProofOfWork(this.difficulty);
        this.journal.push(newEntry);
    }

    toString() {
        return JSON.stringify(this.journal, null, 4);
    }

    validateJournal() {
        for (let i = 1; i < this.journal.length; i++) {
            const currentEntry = this.journal[i];
            const previousEntry = this.journal[i - 1];

            // do the two hashes match?
            if (currentEntry.hash !== currentEntry.calculateHash()) {
                return false;
            }

            // does the current and previous hash match?
            if (currentEntry.previousHash !== previousEntry.hash) {
                return false;
            }

            // are we still orderd by index correctly?
            if (previousEntry.index + 1 !== currentEntry.index) {
                return false;
            }
        }
        return true;
    }
}