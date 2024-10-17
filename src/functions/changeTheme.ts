function changeTheme(isDarkMode: boolean, setIsDarkMode: (value: boolean) => void) {
  const newTheme = isDarkMode ? 'light' : 'dark';
  setIsDarkMode(!isDarkMode);

  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }

  localStorage.setItem('theme', newTheme);
  console.log('Theme changed to', newTheme);
}

export default changeTheme;
