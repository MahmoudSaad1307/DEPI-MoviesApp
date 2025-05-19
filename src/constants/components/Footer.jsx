import Swal from "sweetalert2";

const Footer = () => {
  const bottomIcons=(title)=>{
      Swal.fire({
              title: `${title} clicked`,
              icon: "success",
              html: "<style>.swal2-title { border: none }</style>",
            });
  }
    return (
      <footer className="py-4" style={{ backgroundColor: "#000" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <a
                onClick={() => bottomIcons("Help")}
                className="text-white me-3 bottom-icons"
              >
                Help
              </a>
              <a
                onClick={() => bottomIcons("Site Index")}
                className="text-white me-3 bottom-icons"
              >
                Site Index
              </a>
              <a
                onClick={() => bottomIcons("Box Office Mojo")}
                className="text-white bottom-icons"
              >
                Box Office Mojo
              </a>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <p className="mb-1 text-white">Follow CineMirage on social</p>
              <div className="d-flex justify-content-md-end gap-2">
                <a
                  onClick={() => bottomIcons("Facebook")}
                  className="text-white bottom-icons"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  onClick={() => bottomIcons("Instagram")}
                  className="text-white"
                >
                  <i className="bi bi-instagram bottom-icons"></i>
                </a>
                <a
                  onClick={() => bottomIcons("TikTok")}
                  className="text-white"
                >
                  <i className="bi bi-tiktok bottom-icons"></i>
                </a>
                <a
                  onClick={() => bottomIcons("Twitter")}
                  className="text-white"
                >
                  <i className="bi bi-twitter-x bottom-icons"></i>
                </a>
                <a
                  target="_blank"
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                  on
                  className="text-white"
                >
                  <i className="bi bi-youtube "></i>
                </a>
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <p className="mb-0 text-white">
              © 2024-2025 by CineMirage, Inc. — An{" "}
              <strong style={{ color: "var(--main-color)" }}>CineMirage</strong>{" "}
              Company
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  