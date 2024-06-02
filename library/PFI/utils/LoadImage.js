const loadImage = (productName) => {
    switch (productName) {
      case 'Chasen':
        return require('../assets/images/chasen-whisk.png');
      case 'Chashaku':
        return require('../assets/images/chashaku-scoop.png');
      case 'Chawan':
        return require('../assets/images/chawan-bowl.png');
      case 'Kuse Naoshi':
        return require('../assets/images/chasen-holder.png');
      case 'Tamis':
        return require('../assets/images/sifter.png');
      case 'Matcha Culinaire':
        return require('../assets/images/culinary-matcha.png');
      case 'Ogura Matcha':
        return require('../assets/images/ogura-matcha.png');
      case 'Samurai Matcha Ceremonial':
        return require('../assets/images/samurai-matcha-ceremonial.png');
      case 'Supreme Matcha':
        return require('../assets/images/supreme-matcha.png');
      case 'Vanilluxe Matcha':
        return require('../assets/images/vanilluxe-matcha.png');
      case 'Yame Matcha':
        return require('../assets/images/yame-matcha.png');
      default:
        return require('../assets/images/logo.png');
    }
};

export { loadImage };