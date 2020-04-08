export const dragIn = (el, setName, setModal, type) => {
  //type is boolean declaring whether dropping text==false, or a file==true,

  if (el) {
    console.log(el);
    console.log(el.props);
    const holder = document.getElementById(el.props.id);
    holder.ondragover = () => {
      return false;
    };

    holder.ondragleave = () => {
      return false;
    };

    holder.ondragend = () => {
      return false;
    };

    holder.ondrop = e => {
      e.preventDefault();
      let f = e.dataTransfer.files[0];

      if (f && !type) {
        setName(f.path);
        setModal(true);
      } else {
        let text = e.dataTransfer.getData("text");
        setName(text);
        setModal(true);
      }
    };
  }
};
