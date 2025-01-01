import Swal from 'sweetalert2';

const useResponse = () => {
  const notify = ({ title, text, icon = 'success', position = 'top-end', timer = 2000 }) => {
    Swal.fire({
      title,
      text,
      icon,
      toast: true, // Enables toast mode
      position, // Position of the popup (e.g., 'top-end', 'top-start')
      timer, // Duration in milliseconds
      timerProgressBar: true, // Show a progress bar
      showConfirmButton: false, // No confirm button for a toast
    });
  };

  return { notify };
};

export default useResponse;
