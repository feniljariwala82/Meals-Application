class Meal {
  constructor(
    id,
    catagoryId,
    title,
    affordability,
    complexity,
    imageUrl,
    duration,
    ingredients,
    steps,
    isGlutenFree,
    isVegan,
    isVegitarian,
    isLactosFree
  ) {
    this.id = id;
    this.catagoryId = catagoryId;
    this.title = title;
    this.affordability = affordability;
    this.complexity = complexity;
    this.imageUrl = imageUrl;
    this.duration = duration;
    this.ingredients = ingredients;
    this.steps = steps;
    this.isGlutenFree = isGlutenFree;
    this.isVegan = isVegan;
    this.isVegitarian = isVegitarian;
    this.isLactosFree = isLactosFree;
  }
}

export default Meal;
