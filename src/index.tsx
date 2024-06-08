import { ActionPanel, List, Action, closeMainWindow } from "@raycast/api";
import { connect, Socket } from "net";
import { showFailureToast } from "@raycast/utils";
import { useState, useEffect, useRef } from "react";

export default function Command({ arguments: { host, port } }: { arguments: { host: string, port: string } }) {
  const [elements, setElements] = useState<string[]>();
  const socket = useRef<Socket>();

  useEffect(() => {
    const showErr = (err: ErrorEvent) => {
      showFailureToast(err.message, { title: "Couldn't connect to the script" });
      setElements([]);
    };

    const s = connect({ host, port: parseInt(port) })
    socket.current = s
    s.on('error', showErr);

    let buf: string = '';

    s.on('data', data => {
      buf += data;

      const firstLineEnding = buf.indexOf('\n');
      if (firstLineEnding == -1) return;

      const amount = parseInt(buf.slice(0, firstLineEnding));

      const lines = buf.slice(firstLineEnding + 1).trim().split("\n");
      if (lines.length != amount) return;

      setElements(lines.map(s => s.trim()).filter(s => s.length != 0));
    })

    s.on('close', () => closeMainWindow());

    return () => {
      if (socket.current != null) socket.current.end();
    }
  }, [host, port])


  return (
    <List isLoading={elements === undefined}>
      {elements?.map((item, idx) => <List.Item title={item} key={idx} actions={
        <ActionPanel>
          <Action title="Select" onAction={() => {
            const s = socket.current;
            if (s == null) {
              showFailureToast('Socket disconnected')
              closeMainWindow();
              return;
            }
            s.write(item + '\n')
            s.end()
          }} />
        </ActionPanel>
      } />)}
    </List>
  );
}
