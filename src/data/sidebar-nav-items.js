export default function() {
  return [
    {
      title: "Blog Dashboard",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Blog Posts",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/blog-posts"
    },
    {
      title: "Add New Post",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post"
    },
    {
      title: "Forms & Components",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/components-overview"
    },
    {
      title: "Tables",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/tables"
    },
    {
      title: "School Information",
      htmlBefore: '<i class="material-icons">school</i>',
      to: "/dashboard"
    },
    {
      title: "Bell Schedule",
      htmlBefore: '<i class="material-icons">schedule</i>',
      to: "/schedule"
    },
    {
      title: "Passes",
      htmlBefore: '<i class="material-icons">style</i>',
      to: "/passes"
    },
    {
      title: "Users",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/users"
    }
  ];
}
