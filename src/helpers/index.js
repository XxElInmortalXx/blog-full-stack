// Función para formatear el monto
export const formatCurrency = (amount) =>
  Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

// Función para obtener la fecha y hora actual
export const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

// Función para obtener solo la fecha de un texto con fecha y hora
export const getDateFromCurrentDate = (dateTimeText) => {
    const datePart = dateTimeText.split(' ')[0];
    return datePart;
}


// Función para extraer el nombre del archivo de cada URL
const regex = /\/([^/?]+)\?/;
export const extractFileName = (url) => {
  const match = url.match(regex);
  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  } else {
    return null;
  }
};
