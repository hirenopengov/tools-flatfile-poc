import { ISpace, initializeFlatfile } from "@flatfile/react";
import { useState } from "react";
import { listener } from "./listeners/vendorlistner";
import { workbook } from "./vendorworkbook";

export default function Vendor() {
  const spaceProps: ISpace = {
    name: "Embedded Space",
    // publishableKey: "pk_117cf6817dc74a138bd497ea9f33388f",
    // environmentId: "us_env_oEn4qvuW",
    publishableKey: "pk_942ac8e331514610b72ebfbd3c0d9c94",
    environmentId: "us_env_vj8tcigs",
    workbook,
    listener,
    sidebarConfig: {
      showSidebar: false,
    },
    themeConfig: {
      root: {
        primaryColor: "red",
      },
      sidebar: {
        logo: "https://images.ctfassets.net/hjneo4qi4goj/gL6Blz3kTPdZXWknuIDVx/7bb7c73d93b111ed542d2ed426b42fd5/flatfile.svg",
      },
    },
    closeSpace: {
      operation: "submitActionFg",
      onClose: () => setShowSpace(false),
    },
  };

  const [showSpace, setShowSpace] = useState(false);
  const { Space, OpenEmbed } = initializeFlatfile(spaceProps);

  const onOpenSpace = async () => {
    setShowSpace(!showSpace);
    await OpenEmbed();
  };

  return (
    <div className="content">

      {/*Button to trigger the modal */}
      <div>
        <button className="contrast" onClick={onOpenSpace}>Vendor Import
        </button>
        {showSpace && <Space />}
      </div>
    </div>
  );
}
