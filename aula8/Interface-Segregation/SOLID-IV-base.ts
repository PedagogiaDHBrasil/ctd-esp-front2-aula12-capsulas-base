interface ICreditCard {
    numbers: number;
    name: string;
    expiration_date: number;
    segurity_code: number;
}

interface IFriends {
    name: string;
    status: 'online' | 'offline';
}

type IFriendList = IFriends[];

class Console {
    user: string;
    ligado: boolean;
    friends: IFriendList;
    payments: ICreditCard;

    turnOn() {
        this.ligado = true;
    }
    turnOff() {
        this.ligado = false;
    }
    addFriends(friendsList: IFriendList) {
        this.friends = friendsList;
    }
    addPayMethod(creditCard: ICreditCard) {
        this.payments = creditCard;
    }
}

const PS4 = new Console();

/* o que aconteceria se quiséssemos adicionar um console que precisasse da função add
  amigos ou adicionar métodos de pagamento?
  Por exemplo:
  const Nintendo64 = new Console();
  */
