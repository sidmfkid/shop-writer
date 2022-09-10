import { Shopify } from "@shopify/shopify-api";
// import testData from "./testData.json";

const testData = [
  {
    productTitle: "Plaid Knotted Headband",
    vendorName: "Deux par Deux",
    productTags: [
      "Big Kid",
      "Toddler",
      "Red Black And Beige Plaid ",
      "baby girls",
      "girls",
      "hat",
      "apparel accessories",
      "infant and toddler hair accessories",
      "baby girl",
      "girl",
    ],
    description:
      "Our Plaid Knotted Headband is a perfect match to the various patterned looks in our Chic In My Shack collection. Made from soft poly/elastane with an allover plaid pattern, this headband boasts a comfortable stretch fit with a knotted bow on top.",
  },
  {
    productTitle: "Plaid Dress With Long Sleeves And Mesh Skirt",
    vendorName: "Deux par Deux",
    productTags: [
      "Infant",
      "Little Kid",
      "Toddler",
      "Red Black And Beige Plaid ",
      "baby girls",
      "girls",
      "dress",
      "dresses",
      "infant and toddler dresses",
      "baby girl",
      "girl",
    ],
    description:
      "A round collar adds demure style to our Plaid Dress With Long Sleeves and Mesh Skirt. This two-tone design features a plaid bodice with long sleeves and elastic cuffs, a round neckline with a collar, back snaps, and a bow at the waist. A tiered mesh skirt adds playful style and tons of texture!",
  },
  {
    productTitle: "Plaid Dress With Long Sleeves",
    vendorName: "Deux par Deux",
    productTags: [
      "Big Kid",
      "Little Kid",
      "Toddler",
      "Red Black And Beige Plaid ",
      "girls",
      "dress",
      "dresses",
      "girl",
    ],
    description:
      "Contrast faux leather pockets add an edgy touch to our Plaid Dress With Long Sleeves. This darling look boasts a relaxed fit with long sleeves embellished with bows, a round neckline, round front pockets, and a keyhole with a closure at the back of the neck.",
  },
  {
    productTitle: "Mock Neck Long Sleeve Dress",
    vendorName: "Deux par Deux",
    productTags: [
      "Big Kid",
      "Little Kid",
      "Toddler",
      "Red Black And Beige Plaid ",
      "girls",
      "dress",
      "dresses",
      "girl",
    ],
    description:
      "Our Mock Neck Long Sleeve Dress is comfortable, chic, and perfect for any celebration! This two-tone dress features a solid black bodice with long sleeves, ruffle trim at the shoulders, and a mock neckline. A drop waist plaid skirt adds just the right amount of contrast.",
  },
  {
    productTitle: "Plaid Skirt",
    vendorName: "Deux par Deux",
    productTags: [
      "Big Kid",
      "Little Kid",
      "Toddler",
      "Red Black And Beige Plaid ",
      "girls",
      "skirt",
      "skirts",
      "girl",
    ],
    description:
      "Embellished with small pearlized studs, our Plaid Skirt is for the stylish little girl that's ready to make a fashion statement. In a stretch poly blend with an allover plaid pattern, this short skirt features a flared silhouette with a stretch elastic waistband that makes it oh-so-comfortable to wear.",
  },
  {
    productTitle: "Plaid Tunic And Rib Legging Set",
    vendorName: "Deux par Deux",
    productTags: [
      "Infant",
      "Little Kid",
      "Toddler",
      "Red Black And Beige Plaid ",
      "baby girls",
      "girls",
      "coordinatedoutfit",
      "infant and toddler pants clothing sets",
      "pants clothing sets",
      "baby girl",
      "girl",
    ],
    description:
      "Comfortable yet cute enough for any occasion, our Plaid Tunic and Rib Legging Set is perfect for all sorts of celebrations. This two-piece set features a long sleeve tunic top with a round neckline, a flounce hem, and ruffle trim at the arm holes. It's teamed with a solid rib knit legging with a comfortable elastic waist.",
  },
  {
    productTitle: "Plaid Tunic And Legging Set",
    vendorName: "Deux par Deux",
    productTags: [
      "Big Kid",
      "Little Kid",
      "Toddler",
      "Red Black And Beige Plaid ",
      "girls",
      "coordinatedoutfit",
      "pants clothing sets",
      "girl",
    ],
    description:
      "With a solid bow and little studs, our Plaid Tunic and Legging Set offers a girly look with an edgy twist. This two-piece set features a long sleeve plaid tunic with a round neckline, a flounce hem, and a keyhole button closure at the back of the neck. It's paired with a skinny faux leather pant with a stretch fit and a comfortable elastic waistband.",
  },
  {
    productTitle: "Hooded Fake Fur Vest Beige",
    vendorName: "Deux par Deux",
    productTags: [
      "Big Kid",
      "Little Kid",
      "Toddler",
      "Beige ",
      "girls",
      "sweater",
      "cardigan sweaters",
      "girl",
    ],
    description:
      "Little metallic flecks add a hint of sparkle and shine to our Hooded Fake Fur Vest Beige. This cozy layer is made from poly faux fur and boasts a super soft feel in a zip front silhouette. It's the perfect way to top off a casual look or a pretty party dress!",
  },
  {
    productTitle: "Hooded Fake Fur Coat Beige",
    vendorName: "Deux par Deux",
    productTags: [
      "Infant",
      "Little Kid",
      "Toddler",
      "Beige ",
      "baby girls",
      "girls",
      "coat",
      "outerwear jackets",
      "baby girl",
      "girl",
    ],
    description:
      "Metallic buttons and animal ears make our Hooded Fake Fur Coat Beige a chic addition to any little girl's wardrobe. Soft and cozy in poly faux fur, this jacket features an open bottom, an attached hood with animal ears, and little metallic flecks that add a hint of sparkle and shine.",
  },
  {
    productTitle: "Plush Fanny Bag Silver Pink",
    vendorName: "Deux par Deux",
    productTags: [
      "Little Kid",
      "Silver Pink ",
      "unisex",
      "backpack",
      "childrens luggage",
      "girl",
    ],
    description:
      "Koala bear ears add to the playful design of our Plush Fanny Bag Silver Pink. This waist pack is made from soft poly fabric and features a front zipper closure, a logo patch, and an adjustable strap for carrying around the waist or slung across the body.",
  },
  {
    productTitle: "Organic Cotton Blanket Striped Heather Beige And Dark Grey",
    vendorName: "Deux par Deux",
    productTags: [
      "Infant",
      "Heather Beige And Dark Gray Stripes ",
      "baby boys",
      "blanket",
      "infant and toddler sleepers",
      "baby boy",
    ],
    description:
      "Little ones will be warm and stylish when they're wrapped up in our Organic Cotton Blanket Striped Heather Beige and Dark Grey. This adorable blanket features an allover repeat stripe pattern with solid edges and a small logo label for brand distinction.",
  },
  {
    productTitle: "One Piece Thermal Underwear Black With Dinosaur Print",
    vendorName: "Deux par Deux",
    productTags: [
      "Big Kid",
      "Infant",
      "Little Kid",
      "Toddler",
      "Black With Dinosaurs Printed ",
      "baby boys",
      "boys",
      "underwear",
      "thermal underwear sets",
      "baby boy",
      "boy",
    ],
    description:
      "Our One Piece Thermal Underwear Black With Dinosaur Print is perfect for layering beneath a snowsuit on a cold day. This one-piece design features long raglan sleeves, a round neckline, an asymmetrical zipper closure, and a small logo label for brand distinction.",
  },
  {
    productTitle:
      "Two Piece Thermal Underwear Grey Mix With Printed Little Dogs",
    vendorName: "Deux par Deux",
    productTags: [
      "Big Kid",
      "Little Kid",
      "Toddler",
      "Grey Mix With Printed Littles Dogs ",
      "unisex",
      "underwear",
      "thermal underwear sets",
      "boy",
      "girl",
    ],
    description:
      "Designed for wearing on the coldest days, our Two Piece Thermal Underwear Grey Mix With Printed Little Dogs serves as a comfy and cozy base layer beneath a snowsuit. This two-piece set is made from soft poly fabric and features a long sleeve top with a 1/2 zip neckline, raglan sleeves, and a matching pant with a stretchy elastic waistband.",
  },
  {
    productTitle: "Printed Mini Roses One Piece Baby Snowsuit Dusty Rose",
    vendorName: "Deux par Deux",
    productTags: [
      "Infant",
      "Toddler",
      "Dusty Rose With Printed Mini Roses ",
      "baby girls",
      "outerwear",
      "infant and toddler snowsuits",
      "baby girl",
    ],
    description:
      "Keep little ones warm in the cold and in the snow with our Printed Mini Roses One Piece Baby Snowsuit Dusty Rose. Designed for use with car seats, our snowsuit features a crotch opening that allows the belt harness to be routed through the inside of the snowsuit and buckle the belt directly on the baby's body. This also allows you to leave the front panel open so that baby does not get too hot in the car. This polar-lined insulated snowsuit features an attached hood with removable faux fur trim, removable mittens and ankle boots. A polar neck warmer adds a touch of warmth to our one piece snowsuit!.",
  },
];

const ADJECTIVES = [
  "autumn",
  "hidden",
  "bitter",
  "misty",
  "silent",
  "empty",
  "dry",
  "dark",
  "summer",
  "icy",
  "delicate",
  "quiet",
  "white",
  "cool",
  "spring",
  "winter",
  "patient",
  "twilight",
  "dawn",
  "crimson",
  "wispy",
  "weathered",
  "blue",
  "billowing",
  "broken",
  "cold",
  "damp",
  "falling",
  "frosty",
  "green",
  "long",
];

const NOUNS = [
  "waterfall",
  "river",
  "breeze",
  "moon",
  "rain",
  "wind",
  "sea",
  "morning",
  "snow",
  "lake",
  "sunset",
  "pine",
  "shadow",
  "leaf",
  "dawn",
  "glitter",
  "forest",
  "hill",
  "cloud",
  "meadow",
  "sun",
  "glade",
  "bird",
  "brook",
  "butterfly",
  "bush",
  "dew",
  "dust",
  "field",
  "fire",
  "flower",
];

export const DEFAULT_PRODUCTS_COUNT = 13;
const CREATE_PRODUCTS_MUTATION = `
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
      }
    }
  }
`;

export default async function productCreator(
  session,
  count = DEFAULT_PRODUCTS_COUNT
) {
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

  try {
    for (let i = 0; i < count; i++) {
      await client.query({
        data: {
          query: CREATE_PRODUCTS_MUTATION,
          variables: {
            input: {
              title: `${generateTitle(i)}`,
              descriptionHtml: `${generateDescription(i)}`,
              tags: `${generateTags([i])}`,
              variants: [{ price: randomPrice() }],
            },
          },
        },
      });
    }
  } catch (error) {
    if (error instanceof ShopifyErrors.GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}

function generateTitle(i) {
  return `${testData[i].productTitle}`;
}

function generateDescription(i) {
  return `${testData[i].description}`;
}

function generateTags(i) {
  return `${testData[i].productTags.toString()}`;
}

function randomPrice() {
  return Math.round((Math.random() * 10 + Number.EPSILON) * 100) / 100;
}
