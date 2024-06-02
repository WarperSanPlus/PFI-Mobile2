import { Database, column } from "../../DB/db.mjs";
import Table from "../../DB/table.mjs";

const ID = "id";
const NAME = "name";
const DESCRIPTION = "description";
const PRICE = "price";
const IMAGE = "image";

/**
 * Class that manages the table Matchas
 */
class Matchas extends Table {
    constructor() {
        super("matchas", [
            column(ID, "INTEGER PRIMARY KEY AUTOINCREMENT"),
            column(NAME, "TEXT"),
            column(DESCRIPTION, "TEXT"),
            column(PRICE, "MONEY"),
            column(IMAGE, "TEXT"),
        ]);
    }

    /**
     * Adds a new matcha in the database
     * @param {string} name Name of the matcha 
     * @param {string} description Description of the matcha
     * @param {float} price Price of the matcha 
     * @param {string} image Image of the matcha 
     * @returns 
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
     * Removes an item from the Matchas table
     * @param {string} name Name of the target product
     * @param {*} id_item Identifier of the item
     * @param {string} type Type of the item
     * @returns Promise of the removal
     */
    async remove(name, id_item, type) {

        // If user doesn't exist, skip
        if (!await userExists(username))
            return Promise.resolve();

        // If item doesn't exist, skip
        if (!await itemExists(id_item, type))
            return Promise.resolve();

        let item = await this.get_item(username, id_item, type);

        // If cart item doesn't exist, skip
        if (item == undefined)
            return Promise.resolve();

        // If want to delete or results to 0, delete
        if (quantity < 0 || item[QUANTITY] - quantity <= 0)
            return this.delete(item[ID]);

        // Update
        return this.update(item[ID], [
            column(QUANTITY, item[QUANTITY] - quantity)
        ]);
    };
    /**
     * Adds the default values in the table
     */
    async default() {
        await MATCHAS.create(true);
        await MATCHAS.add("Ogura Matcha", "Ogura Matcha est notre matcha de cérémonie de la plus haute qualité. Ce matcha rare est traditionnellement réservé aux cérémonies du thé les plus exclusives.\n\nCe macha spécial et très rare nous vient directement de la plantation de tencha de la région d'Ogura dans la région d'Uji, connue comme l'un des principaux centres de production des plus hautes qualités de matcha et de gyokuro Ogura est l'endroit où le Matcha a été cultivé pour la première fois.\n\nCe nouveau Uji Matcha exclusif fabriqué à partir du cultivar Yamanoibuki, un cultivar très rare dans la production de tencha.\nOgura Matcha est la poudre verte la plus fraîche et la plus vibrante qui se transforme en une belle tasse de matcha onctueuse avec une onctuosité brillante et se termine par un arrière-goût net sans aucune amertume.\n\nUn excellent choix pour les amateurs de matcha qui recherchent un matcha de véritable qualité. Notre matcha Ogura Uji est mieux préparé sous forme d'usucha (matcha fin).", /*1.08*/27.00, "ogura-matcha.png");
        await MATCHAS.add("Supreme Matcha", "Notre Matcha Suprême est cultivé dans les collines tempérées d'Uji, à la périphérie de Kyoto. Les plants de thé sont ombragés pendant le dernier mois avant la récolte, ce qui produit une couleur verte vibrante et améliore les vitamines A, C et E et les acides aminés naturels.\n\nSupreme Matcha offre des bienfaits pour la santé inégalés et est absolument délicieux, avec un arôme sucré complexe et un goût inégalé. Notre Matcha de qualité suprême est un thé savoureux et polyvalent, se prêtant aussi bien au thé Usucha (fin et léger) qu'au thé Koicha (fort et épais).\n\nSupreme Matcha est le choix parfait pour la cérémonie traditionnelle du thé, pour épater vos invités lors d'occasions spéciales ou pour un peu de luxe au quotidien !", /*0.80*/20.00, "supreme-matcha.png");
        await MATCHAS.add("Samurai Matcha Ceremonial", "Cueilli à la main de manière traditionnelle par des producteurs de thé qualifiés et expérimentés, notre Samurai Matcha est originaire de la vallée d'Obuku et est l'un des rares thés restants à être cultivé et récolté à la main plutôt que mécaniquement.\n\nCette méthode traditionnelle produit un thé vert distinctif d'une qualité inégalée pour les amateurs de thé exigeants du monde entier. Une fois préparé, le Samurai Matcha offre une tasse onctueuse et moelleuse.\n\nProfond en saveur et riche en bienfaits pour la santé, notre Samurai Matcha se prépare sans effort, un moyen facile de profiter des antioxydants, du bêta-carotène et des vitamines.\n\nChoix de haute qualité pour du matcha pur, notre thé Samurai Matcha Ceremony est le thé vert parfait à choisir pour les moments où seul le meilleur fera l'affaire !", /*0.72*/ 17.40, "samurai-matcha-ceremonial.png");
        await MATCHAS.add("Yame Matcha", "Yame Matcha Supreme est une poudre de matcha incroyablement complexe, riche et noisette provenant de la préfecture de Fukuoka au Japon.\n\nYame Matcha Supreme est fabriqué par un maître du thé en utilisant les premières feuilles de 5 variétés différentes de théiers japonais : les buissons Okumidori, Saemidori, Tsuyuhikari, Okuyutaka et Yabukita pour le profil de saveur le plus équilibré et le plus complexe.\n\nLe Yame Matcha est fabriqué selon la méthode traditionnelle japonaise, dans laquelle une fois ces feuilles cueillies, elles sont ensuite cuites à la vapeur, séchées et mélangées avant d'être broyées en poudre fine dans un « Usu » traditionnel ou moulin en pierre. La saveur de ce matcha est beurrée et noisette comme le sésame, douce et incroyablement complexe.\n\nYame Matcha Supreme est une poudre de matcha exclusive et vibrante qui se transforme en une belle tasse de matcha onctueuse avec une onctuosité douce, un corps de noisette et une richesse complexe en saveur.\n\nC'est un excellent choix pour les amateurs de matcha qui recherchent un matcha de luxe de qualité. Il est préférable de le préparer sous forme d'usucha (matcha fin).", /*0.56*/15.80, "yame-matcha.png");
        await MATCHAS.add("Vanilluxe Matcha", "Notre pré-mélange Matcha Vanille combine du matcha pur de qualité supérieure avec la richesse de la vanille pure ! Notre touche moderne s'inspire des maisons de thé japonaises branchées avec des bonbons aromatisés au matcha.\n\nCelui-ci doit être absolument préparé directement en fouettant dans de l'eau chaude, et ne doit pas être utilisé avec du lait chaud ! La saveur crémeuse de la gousse de vanille prend le dessus et le matcha pur persiste en arrière-plan !\n\nNotre Matcha Vanille est édulcoré avec du sucre de canne naturel et ne contient aucun colorant artificiel, conservateur ou additif chimique. Naturellement, notre mélange Matcha Vanille de qualité supérieure est non seulement délicieux mais aussi sain !", /*0.40*/14.00, "vanilluxe-matcha.png");
        await MATCHAS.add("Matcha Culinaire", "Notre Matcha Culinaire est une poudre de Matcha de qualité inférieure spécialement destinée à tous vos besoins culinaires ! Il est parfait pour la pâtisserie (pensez : cupcakes, pains, gâteaux, soupes) et pour vos boissons mélangées créatives comme les smoothies et les lattes au thé vert !\n\nLe matcha culinaire n'est pas destiné à être bu pur, mais constitue l'ingrédient parfait pour toutes sortes de recettes et de plats japonais.\n\nCe matcha est produit avec des feuilles qui peuvent avoir été cassées ou meurtries avant d'être séchées et moulues. Cela crée une saveur de matcha beaucoup plus forte, ce qui est absolument idéal pour un thé en poudre qui aura une saveur suffisamment forte dans votre produit fini !\n\nPopulaire parmi les chefs, ainsi que dans les restaurants de sushi, les cafés et de nombreux autres établissements, le Matcha Culinaire est l'ingrédient aromatisant le thé vert pur parfait !", /*0.40*/10.00, "culinary-matcha.png");
    }
};

/**
 * Table of matchas
 */
const MATCHAS = new Matchas();

export {
    MATCHAS,
};