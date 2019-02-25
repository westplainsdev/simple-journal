const JournalEntries = require('./JournalEntries');

// Write Javascript code!
function setDateTime(hoursForward) {
    var datetimeNow = new Date();
    datetimeNow.setHours(datetimeNow.getHours() + hoursForward);
    return datetimeNow;
}

let runnerData = {
    setValidity: {
        valid: false,
        invalid: true
    },
    createdDates: [
        new setDateTime(2).toLocaleString(),
        new setDateTime(4).toLocaleString(),
        new setDateTime(6).toLocaleString()
    ]
}

function toggleValidity(isChanged) {
    if (isChanged) {
        journal.journal[1].data = {
            amount: 100
        };
        console.log('The data has been manipulated');
    }
}


// create a new journal and set the genesis entry
let journal = new JournalEntries.Journal();
console.log('\nA new journal has been created: ' + JSON.stringify(journal.getLatestEntry(), null, 4));

// add data to the journal
journal.addEntry(new JournalEntries.Entry(1, runnerData.createdDates[0], {
    amount: 4
}));
journal.addEntry(new JournalEntries.Entry(2, runnerData.createdDates[1], {
    amount: 8
}));
journal.addEntry(new JournalEntries.Entry(3, runnerData.createdDates[2], {
    amount: 12
}));

// Check if journal is valid (will return true)
console.log('\nIs Journal valid? ' + journal.validateJournal());

// Let's now manipulate the data (this can be toggled for differnet responses)
toggleValidity(runnerData.setValidity.invalid);

// Check our journal again 
if (journal.validateJournal()) {
    console.log('The journal is valid');
    console.log('The journal currently has %s entries.', journal.getCurrentJournalLength());
    console.log("The journal appears as: " + journal.toString());
} else {
    console.log('The journal is now INVALID');
    console.log('The journal currently has %s entries.', journal.getCurrentJournalLength());
    console.log('The invalid journal entry is: ' + JSON.stringify(journal.journal[1], null, 4));
}

console.log("\nFull journal follows: ");
console.log(journal.toString());

console.log('\nJournal run completed.\n');