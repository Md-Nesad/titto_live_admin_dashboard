import { useState } from "react";

export default function useViewModal() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleViewClick = (item) => {
    item && setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  return {
    open,
    selectedItem,
    handleViewClick,
    handleClose,
  };
}
