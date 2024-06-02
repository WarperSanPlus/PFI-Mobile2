import { Database, column } from "../../DB/db.mjs";
import Table from "../../DB/table.mjs";

const ID = "id";
const NAME = "name";
const DESCRIPTION = "description";
const PRICE = "price";
const IMAGE = "image";

/**
 * Class that manages the Accessories table
 */
class Accessories extends Table {
    constructor() {

        super("accessories", [
            column(ID, "INTEGER PRIMARY KEY AUTOINCREMENT"),
            column(NAME, "TEXT"),
            column(DESCRIPTION, "TEXT"),
            column(PRICE, "MONEY"),
            column(IMAGE, "TEXT"),
        ]);
    }

    /**
     * Adds an accessory to the database
     * @param {string} name Name of the accessory
     * @param {string} description Description of the accessory
     * @param {float} price Price of the accessory
     * @param {string} image Image of the accessory
     * @returns Promise of the addition
     */
    async add(name, description = "", price = 0.0, image = "undefined") {
        return Database.db.add(this.TABLE_NAME, [
            column(NAME, name),
            column(DESCRIPTION, description),
            column(PRICE, price),
            column(IMAGE, image),
        ]);
    };

    /**
     * Default values of this table
     */
    async default() {
        await this.add("Chasen", "Notre fouet à matcha en bambou (ou « Chasen ») est l'outil idéal pour préparer votre thé vert matcha. Il est indispensable dans la cérémonie traditionnelle japonaise du thé (« chanoyu »).\n\nLe Matcha est un thé vert japonais unique, moulu sur pierre en une poudre très fine et qui doit être fouetté (et non trempé) dans l'eau avant d'être consommé.\n\nUn fouet à matcha vous aide à vivre une expérience unique de la manière traditionnelle du thé, le moyen idéal de profiter de la fine culture japonaise traditionnelle - une pause dans le quotidien.", 16, "chasen-whisk.png");
        await this.add("Chashaku", "Notre cuillère à thé en bambou (ou « Chashaku ») est utilisé pour mesurer la poudre de votre thé matcha. Le chashaku est incontournable dans la cérémonie traditionnelle japonaise du thé (chanoyu).\n\nLe Matcha est un thé vert japonais unique, moulu sur pierre en une poudre très fine et qui doit être fouetté (et non trempé) dans l'eau avant d'être consommé.\n\nUn chashaku simple et élégant vous aide à vivre une expérience unique de la manière traditionnelle du thé, une manière idéale de profiter de la fine culture japonaise traditionnelle.", 4, "chashaku-scoop.png");
        await this.add("Tamis", "Il est nécessaire de tamiser votre matcha avant de le fouetter, car il a tendance à s'agglutiner lorsque vous le buvez. Le tamisage est un processus essentiel, et notre tamis manuel à matcha fabriqué au Japon est le moyen le plus pratique et le plus simple de tamiser votre bon matcha !\n\nNotre tamis simple est doté d'une poignée qui vous permet de le placer facilement sur votre bol à matcha pendant que vous ramassez et mesurez votre poudre de matcha.\n\nLe Matcha est un thé vert japonais unique, moulu sur pierre en une poudre très fine et qui doit être tamisé et fouetté (et non trempé) dans l'eau avant d'être consommé. Notre outil pratique en fait une synchronisation pour profiter de votre matcha au quotidien.", 8, "sifter.png");
        await this.add("Chawan", "Buvez votre matcha de façon traditionelle avec notre bol à matcha en céramique (ou « Chawan »), fabriqué à main au Japon.\n\nLe chawan est utilisé pour préparer et fouetter le matcha sans éclaboussures grâce aux haute parois et sa forme cylindré. Il est non seulement résistant à la chaleur mais aussi resistants aux égratignures.", 42, "chawan-bowl.png");
        await this.add("Kuse Naoshi", "Notre porte-fouet (ou « Kuse Naoshi ») est idéal pour entretenir votre fouet traditionnel en bambou (chasen). La courbe du support pour fouet à matcha conserve la forme de votre fouet et permet également une bonne circulation de l'air pour favoriser le séchage et empêcher la croissance de moisissures.\n\nL'utilisation d'un support pour fouet à matcha est un moyen idéal pour prolonger la durée de vie de votre fouet. Le Matcha est un thé vert japonais unique, moulu sur pierre en une poudre très fine et qui doit être tamisé et fouetté (et non trempé) dans l'eau avant d'être consommé.\n\nCet outil pratique permet de savourer votre matcha au quotidien en entretenant votre indispensable fouet en bambou.", 8, "chasen-holder.png");
    };
};

/**
 * Table of accessories
 */
const ACCESSORIES = new Accessories();

export {
    ACCESSORIES,
};
