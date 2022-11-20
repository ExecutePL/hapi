import { Box, Typography } from "@mui/material";
// import { QrReader } from "react-qr-reader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "components/Layout";

export const CodeReader = () => {
  const [data, setData] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!data) return;
    const isSerialNumber = data.includes("serialNumber");
    if (isSerialNumber) {
      const serialNumber = data.slice(13, data.length + 1);
      navigate(`/add-sensor/${serialNumber}`);
    }
  }, [data]);

  return (
    <Layout>
      <Typography color="secondary" fontSize="18px" sx={{ padding: "15px" }}>
        Please, scan qr code
      </Typography>
      <Box sx={{ width: "100%", height: "100%" }}>
        {/* <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData((result as any)?.text);
            }
          }}
          constraints={{
            facingMode: "environment",
          }}
        /> */}
      </Box>
    </Layout>
  );
};
