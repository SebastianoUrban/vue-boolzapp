const contacts = [
    {
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Ricordati di stendere i panni',
                status: 'sent'
            },
            {
                date: '10/01/2020 16:15:22',
                message: 'Tutto fatto!',
                status: 'received'
            },
            {
                date: '19/12/2022 10:35:22',
                message: 'adadas das dfa das da da d asd ad asd asd a d asdasdasdas dad d asd ad ada d adadasd asd a dadadasda adasd adasd asd ad ad ad as das da dadada dadad asdadad asd',
                status: 'received'
            }
        ],
    },
    {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [
            {
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent'
            },
            {
                date: '20/03/2020 16:30:55',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
            },
            {
                date: '20/03/2020 16:35:00',
                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent'
            }
        ],
    },
    {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [
            {
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
            },
            {
                date: '28/03/2020 10:20:10',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
            },
            {
                date: '28/03/2020 16:15:22',
                message: 'Ah scusa!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Alessandro B.',
        avatar: '_4',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Si, ma preferirei andare al cinema',
                status: 'received'
            }
        ],
    },
    {
        name: 'Alessandro L.',
        avatar: '_5',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ricordati di chiamare la nonna',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Va bene, stasera la sento',
                status: 'received'
            }
        ],
    },
    {
        name: 'Claudia',
        avatar: '_6',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao Claudia, hai novità?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Non ancora',
                status: 'received'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'Nessuna nuova, buona nuova',
                status: 'sent'
            }
        ],
    },
    {
        name: 'Federico',
        avatar: '_7',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Fai gli auguri a Martina che è il suo compleanno!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Grazie per avermelo ricordato, le scrivo subito!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Davide',
        avatar: '_8',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                status: 'received'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'OK!!',
                status: 'received'
            }
        ],
    }
]

const DateTime = luxon.DateTime;

function dateToIsoForm (string) {
    const output = `${string.substring(6,10)}-${string.substring(3,5)}-${string.substring(0,2)}T${string.substring(11.19)}`
    return output;
}

function diffDate(date1, date2) {
    const date1Conv = luxon.DateTime.fromISO(date1);
    const date2Conv = luxon.DateTime.fromISO(date2);

    const diff = date1Conv.diff(date2Conv, ["days", "hours", "minutes", "seconds"]);
    return diff.values;
}




//console.log(diffDate(contacts[0].messages[2].date, contacts[0].messages[3].date).minutes);
//console.log(DateTime.now().toISO().substring(0,19));


const { createApp } = Vue;


createApp({
    data() {
        return {
            contacts: contacts,
            contanctSelected : 0,
            prova : 0,
            textNewMessage : '',
            nameSearched : ''
        }
    },
    methods: {
        addMessage() { 
            if (this.textNewMessage != '') {
                const newMessage = {
                    date: DateTime.now().toFormat("dd/MM/yyyy hh:mm:ss"),
                    message: this.textNewMessage,
                    status: 'sent'
                };
                this.contacts[this.contanctSelected].messages.push(newMessage);
                this.textNewMessage = '';
                setTimeout(() => {
                    const newMessageReplay = {
                        date: DateTime.now().toFormat("dd/MM/yyyy hh:mm:ss"),
                        message: 'ok',
                        status: 'received'
                    };
                    this.contacts[this.contanctSelected].messages.push(newMessageReplay);
                }, 1000);
            }
        },
        searchName() { 
            for (let i=0; i<this.contacts.length; i++) {
                if ( !(this.contacts[i].name.toLowerCase().includes(this.nameSearched)) ) {
                    this.contacts[i].visible = false;
                } else {
                    this.contacts[i].visible = true;
                }
            }
        },
        lastAcces(contact) {
            let lastMessage = false;
            let i = contact.messages.length -1;
            while (!lastMessage) {
                if(i==0 || contact.messages[i].status == 'received') {
                    lastMessage = contact.messages[i].date;
                } else {
                    i--;
                }
            }
            const diff = diffDate(DateTime.now().toISO().substring(0,19),  dateToIsoForm(lastMessage));
            console.log(diff);
            let output = '';
            if (diff.days <= 30) {
                if (diff.hours < 24 && diff.days == 0) {
                    if (diff.minutes < 60 && diff.hours == 0) {
                        if (diff.seconds < 60  && diff.minutes == 0) {
                            output = diff.seconds + ' secondi fa';
                        } else {
                            output = diff.minutes + ' minuti fa';
                        }
                    } else {
                        output = diff.hours + ' ore fa';
                    }
                } else {
                    output = diff.days + ' giorni fa';
                }
            } else {
                output = lastMessage.substring(0,10);
            }
        
            return output;
        }
    }
}).mount('#app');

