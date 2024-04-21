export const formatDateToDayMonthYear = (time) => {
	const date = new Date(time);
	const day = date.getDate().toString().padStart(2, "0"); // добавляем ведущий ноль, если число меньше 10
	const month = (date.getMonth() + 1).toString().padStart(2, "0"); // добавляем ведущий ноль, если месяц меньше 10
	const year = date.getFullYear();
	return `${day}.${month}.${year}`;
};
