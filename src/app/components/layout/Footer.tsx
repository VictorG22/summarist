
  export default function Footer() {
    const linkList = [
      {
        title: "Actions",
        links: [
          "Summarist Magazine",
          "Cancel Subscription",
          "Help",
          "Contact us",
        ],
      },
      {
        title: "Useful Links",
        links: [
          "Pricing",
          "Summarist Business",
          "Gift Cards",
          "Authors & Publishers",
        ],
      },
      {
        title: "Company",
        links: ["About", "Careers", "Partners", "Code of Conduct"],
      },
      {
        title: "Other",
        links: [
          "Sitemap",
          "Legal Notice",
          "Terms of Service",
          "Privacy Policies",
        ],
      },
    ];

    return (
      <footer id="footer" className="bg-[#f1f6f4] py-10">
        <div className="max-w-267.5 w-full mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  justify-between gap-8 mb-16">
          {linkList.map((list, index) => (
            <div key={index}>
              <h4 className="text-[#032b41] font-bold text-lg mb-4">
                {list.title}
              </h4>
              <div className="flex flex-col gap-1 md:gap-3">
                {list.links.map((link, i) => (
                  <a
                    key={i}
                    className="text-[#394547] text-sm cursor-not-allowed"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center text-[#032b41] font-semibold">
          Copyright &copy; 2023 Summarist.
        </div>
      </footer>
    );
  };