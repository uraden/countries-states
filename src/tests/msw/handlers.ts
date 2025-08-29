import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("**/countries", () =>
    HttpResponse.json([{ id: 86, value: "Germany" }, { id: 13, value: "Australia" }])
  ),
  http.get("**/countries/:id/states", ({ params }) => {
    const id = Number(params.id);
    if (id === 13) return HttpResponse.json([{ id: 1, value: "Queensland" }]);
    if (id === 86) return HttpResponse.json([{ id: 2, value: "Bavaria" }]);
    return HttpResponse.json([]);
  }),
];
