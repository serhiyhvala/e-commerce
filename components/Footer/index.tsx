const Footer = () => {
  return (
    <footer className="flex w-full border-t-2 item-center justify-center p-5">
      <span className="font-light text-sm text-gray-500">
        © {new Date().getFullYear()} Store, Inc. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
