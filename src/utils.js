export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: undefined, hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  
  export const getInitials = (name) => {
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.substring(0, 2).toUpperCase();
  };
  