export const calcKcal = (gender, weight, height, age, activityLevel) => {
    // Проверка на корректность значения пола
    const isWoman =
        gender.toLowerCase() === "woman" || gender.toLowerCase() === "female";
    const isMan =
        gender.toLowerCase() === "man" || gender.toLowerCase() === "male";

    // Если значение пола некорректно, выдаем ошибку
    if (!isWoman && !isMan) {
        throw new Error(
            "Неверное значение пола. Допустимые значения: 'woman' или 'man'."
        );
    }

    // Определение коэффициента пола
    const genderCoef = isWoman ? -161 : +5;

    // Определение уровня активности
    /* const activityLevel = [
        { value: 1.2, text: "немає фіз.нагрузки" },
        { value: 1.375, text: "1-3 рази на тиждень" },
        { value: 1.55, text: "3-5 рази на тиждень" },
        { value: 1.725, text: "6-7 рази на тиждень" },
        { value: 1.9, text: "2 рази на день" },
    ]; */

    // Расчет базового метаболического коэффициента (BMR)
    const bmr = 10 * weight + 6.25 * height - 5 * age + genderCoef;

    // Вычисление калорий в зависимости от уровня активности
    const result =
        bmr * activityLevel - bmr * activityLevel * 0.15;

    // Расчет потребления БЖУ (белки, жиры, углеводы)
    const protein = (result * 0.2) / 4 // 30% от калорий
    const fat = (result * 0.25) / 9 // 30% от калорий
    const carbohydrate = (result - ((result * 0.2) + (result * 0.25))) / 4 // 40% от калорий

    return {
        calories: result.toFixed(0),
        protein: protein.toFixed(0),
        fat: fat.toFixed(0),
        carbohydrate: carbohydrate.toFixed(0),
    };
};
