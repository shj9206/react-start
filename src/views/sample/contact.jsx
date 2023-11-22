import { Form, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getContact, updateContact } from "@/utils/contacts";
import Favorite from "@/components/sample/Favorite";

const contactDetailQuery = (id) => ({
  queryKey: ["contacts", "detail", id],
  queryFn: async () => {
    const contact = await getContact(id);
    if (!contact) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return contact;
  },
});
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const query = contactDetailQuery(params.contactId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
// export async function loader({ params }) {
//   const contact = await getContact(params.contactId);
//   if (!contact) {
//     throw new Response("", {
//       status: 404,
//       statusText: "Not Found",
//     });
//   }
//   return { contact };
// }
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    let formData = await request.formData();
    const contact = await updateContact(params.contactId, {
      favorite: formData.get("favorite") === "true",
    });
    await queryClient.invalidateQueries({ queryKey: ["contacts"] });
    return contact;
  };
// export async function action({ request, params }) {
//   let formData = await request.formData();
//   return updateContact(params.contactId, {
//     favorite: formData.get("favorite") === "true",
//   });
// }
export default function Contact() {
  const params = useParams();
  const { data: contact } = useQuery(contactDetailQuery(params.contactId));

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
