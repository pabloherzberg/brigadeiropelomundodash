const useSendWhatsappMessage = () => {
  const isMobile =
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i);

  return ({ number, msg }) => {
    console.log(number, msg);
    console.log(isMobile);

    /* const targetUrl = isMobile
      ? `whatsapp://send?text=${encodeURIComponent(msg)}`
      : `https://api.whatsapp.com/send?phone=${encodeURIComponent(
          number
        )}&text=${encodeURIComponent(msg)}`; */

    window.open(`https://wa.me/${number}?text=${msg}`);
  };
};

export default useSendWhatsappMessage;
