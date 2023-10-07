import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    await prisma.post.create({
        data:{
            title: "Minha primeira entry",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia ullamcorper enim, at volutpat dolor vestibulum vitae. Sed porttitor risus sed mollis vestibulum. Duis congue id lacus tincidunt varius. Fusce ut condimentum tortor, id mollis ante. Phasellus pharetra purus eu velit vehicula rhoncus. Aenean vehicula mauris sed nulla sodales, non gravida ante lacinia. Nam eget nunc commodo, iaculis enim a, porttitor urna. Suspendisse bibendum tincidunt massa, et sodales arcu tincidunt sed. Proin lacus odio, gravida et neque vitae, ultrices congue turpis. In hac habitasse platea dictumst. Duis lobortis venenatis blandit. Praesent ornare felis vel risus rhoncus, rhoncus posuere neque pretium."
        }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });