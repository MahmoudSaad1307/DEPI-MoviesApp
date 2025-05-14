const Footer = () => {
    return (
      <footer className="py-4" style={{ backgroundColor: "#000" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <a href="#" className="text-white me-3">Help</a>
              <a href="#" className="text-white me-3">Site Index</a>
              <a href="#" className="text-white">Box Office Mojo</a>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <p className="mb-1 text-white">Follow CineMirage on social</p>
              <div className="d-flex justify-content-md-end gap-2">
                <a href="#" className="text-white"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-white"><i className="bi bi-tiktok"></i></a>
                <a href="#" className="text-white"><i className="bi bi-twitter-x"></i></a>
                <a href="#" className="text-white"><i className="bi bi-youtube"></i></a>
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <p className="mb-0 text-white">
              © 2024-2025 by CineMirage, Inc. — An <strong style={{ color: "var(--main-color)" }}>CineMirage</strong> Company
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  