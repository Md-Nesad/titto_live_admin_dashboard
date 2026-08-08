export default function ModalHandler({ children }) {
  const [open, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  export const handleViewClick = (agency) => {
    setUser(agency);
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <>{open && children({ open, onClose: () => setIsOpen(false), user })}</>
  );
}
