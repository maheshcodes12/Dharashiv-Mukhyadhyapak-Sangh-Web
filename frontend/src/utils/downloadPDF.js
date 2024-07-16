import jsPDF from "jspdf";
import "jspdf-autotable";
import {
	getTalukaWiseData,
	getTalukaWiseStudentsData,
} from "../services/talukaWiseData";

const makeDataArray = (talukaWiseStudentsData, taluka, exam, year) => {
	const arrayWithoutNullValues = talukaWiseStudentsData.filter((n) => n);

	const transformedArray = arrayWithoutNullValues.map((array) => {
		const schoolName = array[0].schoolName;

		// Extracting marathiMedium, otherMedium, sanHindi, and sanskrit for each class
		const marathiMedium = array.slice(1).map((obj) => {
			return obj.marathiMedium || 0;
		});
		const otherMedium = array.slice(1).map((obj) => {
			return obj.otherMedium || 0;
		});
		const sanHindi = array.slice(1).map((obj) => {
			return obj.sanHindi || 0;
		});
		const sanskrit = array.slice(1).map((obj) => {
			return obj.sanskrit || 0;
		});
		let price = 0;
		for (let i = 0; i < array.slice(1).length; i++) {
			const element = array.slice(1)[i];
			price += element.totalPrice;
		}

		return [
			schoolName,
			...marathiMedium,
			...otherMedium,
			...sanHindi,
			...sanskrit,
			price,
		];
	});
	const head = [
		[
			{
				content: `Taluka: ${taluka}`,
				colSpan: 8,
				styles: { halign: "center" },
			},
			{ content: `Exam: ${exam}`, colSpan: 8, styles: { halign: "center" } },
			{ content: `Year: ${year}`, colSpan: 10, styles: { halign: "center" } },
		],
		[
			{ content: "School", colSpan: 1, styles: { halign: "center" } },
			{ content: "Marathi Medium", colSpan: 6, styles: { halign: "center" } },
			{ content: "Other Medium", colSpan: 6, styles: { halign: "center" } },
			{ content: "Sanyukt Hindi", colSpan: 6, styles: { halign: "center" } },
			{ content: "Sanskrit", colSpan: 6, styles: { halign: "center" } },
			{ content: "Price", colSpan: 1, styles: { halign: "center" } },
		],
		[
			{
				content: "Class ->",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "5",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "6",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "7",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "8",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "9",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "10",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "5",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "6",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "7",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "8",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "9",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "10",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "5",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "6",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "7",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "8",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "9",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "10",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "5",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "6",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "7",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "8",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "9",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "10",
				colSpan: 1,
				styles: { halign: "center", fontSize: 12, fontStyle: "bold" },
			},
			{
				content: "TOTAL",
				colSpan: 1,
				styles: { halign: "center", fontSize: 8, fontStyle: "bold" },
			},
		],
	];

	return [...head, ...transformedArray];
};

const downloadPDF = async (taluka, exam, year) => {
	const a = await getTalukaWiseData(taluka);
	const talukaWiseStudentsData = await getTalukaWiseStudentsData(
		taluka.trim(),
		year.trim(),
		exam.trim()
	);

	const data = makeDataArray(talukaWiseStudentsData, taluka, exam, year);
	const doc = new jsPDF({
		orientation: "landscape",
		unit: "mm",
		format: "a4",
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		marginBottom: 10,
	});

	doc.setFontSize(8);

	let startY = 10;
	let pageHeight = doc.internal.pageSize.height;

	const addTableContent = () => {
		let currentY = startY;
		const totalPages = doc.internal.getNumberOfPages();

		doc.autoTable({
			head: [data[0]],
			body: [...data.slice(1)],
			theme: "grid",
			startY: currentY,
			columnStyles: {
				0: { cellWidth: 59 },
				1: { cellWidth: 8 },
				2: { cellWidth: 8 },
				3: { cellWidth: 8 },
				4: { cellWidth: 8 },
				5: { cellWidth: 8 },
				6: { cellWidth: 8 },
				7: { cellWidth: 8 },
				8: { cellWidth: 8 },
				9: { cellWidth: 8 },
				10: { cellWidth: 8 },
				11: { cellWidth: 8 },
				12: { cellWidth: 8 },
				13: { cellWidth: 8 },
				14: { cellWidth: 8 },
				15: { cellWidth: 8 },
				16: { cellWidth: 8 },
				17: { cellWidth: 8 },
				18: { cellWidth: 8 },
				19: { cellWidth: 8 },
				20: { cellWidth: 8 },
				21: { cellWidth: 8 },
				22: { cellWidth: 8 },
				23: { cellWidth: 8 },
				24: { cellWidth: 8 },
				25: { cellWidth: 16 },
			},
			didDrawPage: function (data) {
				if (doc.internal.getNumberOfPages() > totalPages) {
					currentY = 10; // Reset startY for new page
				} else {
					currentY = data.cursor.y + 10; // Update currentY based on current position
				}
				if (currentY > pageHeight - 20) {
					doc.addPage(); // Start new page if remaining space is insufficient
					currentY = 10; // Reset startY for new page
				}
			},
		});
	};

	addTableContent();

	doc.save(`${taluka}-${exam}-${year}.pdf`);
};

export default downloadPDF;
