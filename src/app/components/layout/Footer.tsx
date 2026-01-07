
  export default function Footer() {
    const blocks = [
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
        <div className="max-w-267.5 w-full mx-auto px-6 flex flex-col md:flex-row justify-between gap-8 mb-16">
          {blocks.map((block, idx) => (
            <div key={idx}>
              <h4 className="text-[#032b41] font-semibold text-lg mb-4">
                {block.title}
              </h4>
              <div className="flex flex-col gap-3">
                {block.links.map((link, i) => (
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
        <div className="flex justify-center text-[#032b41] font-medium">
          Copyright &copy; 2023 Summarist.
        </div>
      </footer>
    );
  };