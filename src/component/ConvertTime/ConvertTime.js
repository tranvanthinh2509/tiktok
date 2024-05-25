export const convertTime = (date) => {
    //chuyển đổi ra ngày tháng
    function convertToCustomFormat(isoDate) {
        const dateObj = new Date(isoDate);
        const day = dateObj.getUTCDate();
        const month = dateObj.getUTCMonth() + 1; // Tháng tính từ 0, cộng thêm 1 để đúng tháng
        const formattedDate = `${day}/${month}`;
        return formattedDate;
    }

    return convertToCustomFormat(date);
};
