import { Card, CardBody } from "@heroui/react";
import CanvaPlayground from "./elements/canva";
export default function NewAgentPage() {
  return (
    <div>
      <section className="px-150 py-10">
        <Card>
          <CardBody>
            <p>Create New Agent</p>
          </CardBody>
        </Card>
      </section>
      {/* Add your new agent creation form or components here */}
      {/**Canva Design */}

      <CanvaPlayground />
    </div>
  );
}
