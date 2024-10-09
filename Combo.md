The **Combo Deals Table** is designed to handle **special offers** or **combination meals** where multiple items are bundled together at a discounted price. Combo deals are common in restaurants, cafes, and even hotels, where the vendor may offer multiple items (like a meal and drink) at a single price.

This allows vendors to promote special packages (e.g., "Burger + Fries + Drink" for a discounted price). The combo deals are not limited to food and drinks but can also apply to services or other offerings that a hotel or restaurant may provide.

### **Use Cases for Combo Deals:**
1. **Meal Deals**: A restaurant could offer a combo deal where a burger, fries, and a drink are sold at a bundled price.
2. **Seasonal Offers**: Cafes might bundle a coffee and a muffin at a special price during the morning hours.
3. **Hotel Packages**: A hotel could offer a "stay and dine" package where the room booking includes a dinner or breakfast at a discounted price.

---

### **Database Schema for Combo Deals**

Here’s a schema breakdown for managing combo deals and linking them with menu items.

---

#### 1. **Combo Deals Table**

This table stores the basic information about the combo deal, like the combo name, description, and price.

```sql
CREATE TABLE combo_deals (
  combo_id CHAR(36) PRIMARY KEY DEFAULT (UUID()), -- Unique ID for the combo deal
  vendor_id CHAR(36) REFERENCES vendors(vendor_id), -- The vendor offering this combo deal
  combo_name VARCHAR(255) NOT NULL, -- Example: "Burger Combo Deal"
  combo_description TEXT, -- Example: "Includes a burger, fries, and a soft drink"
  combo_price DECIMAL(10, 2) NOT NULL, -- Discounted price for the combo deal
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 2. **Combo Items Table**

This table links individual menu items to the combo deal. One combo can consist of multiple items from the menu.

```sql
CREATE TABLE combo_items (
  combo_item_id CHAR(36) PRIMARY KEY DEFAULT (UUID()), -- Unique ID for each item in the combo
  combo_id CHAR(36) REFERENCES combo_deals(combo_id), -- The combo deal to which this item belongs
  item_id CHAR(36) REFERENCES menu_items(item_id), -- The menu item that is part of the combo
  quantity INT DEFAULT 1 -- Quantity of the item in the combo (e.g., 1 burger, 1 fries, etc.)
);
```

---

### **Explanation of Each Table:**

1. **Combo Deals Table**:
   - **combo_id**: A unique identifier for the combo deal.
   - **vendor_id**: Identifies the vendor (e.g., restaurant, cafe) offering this combo.
   - **combo_name**: The name of the combo deal (e.g., "Burger Combo").
   - **combo_description**: A description explaining what's included in the combo (e.g., "Burger, fries, and a soft drink").
   - **combo_price**: The total price for the entire combo, which is usually less than the sum of individual item prices.
   - **created_at** and **updated_at**: Timestamps for tracking when the combo was created and last updated.

2. **Combo Items Table**:
   - **combo_item_id**: A unique identifier for each item in the combo deal.
   - **combo_id**: Links to the specific combo deal (from the `combo_deals` table).
   - **item_id**: Links to a specific menu item (from the `menu_items` table) that is part of the combo.
   - **quantity**: Specifies how many of the item are included in the combo (e.g., "2 fries" or "1 burger").

---

### **Example Combo Deal**

Let’s say a restaurant wants to create a **"Burger Combo Deal"** that includes:
- 1 Burger
- 1 Fries
- 1 Soft Drink
- All for a discounted price of $9.99

The data would look like this in the tables:

#### **Combo Deals Table**:
| combo_id                               | vendor_id                           | combo_name      | combo_description                | combo_price | created_at          | updated_at          |
|----------------------------------------|-------------------------------------|-----------------|----------------------------------|-------------|---------------------|---------------------|
| `uuid-1`                               | `uuid-vendor-1`                     | Burger Combo    | Includes burger, fries, and drink | 9.99        | 2024-10-01 10:00:00 | 2024-10-01 10:00:00 |

#### **Combo Items Table**:
| combo_item_id                          | combo_id                            | item_id                                | quantity |
|----------------------------------------|-------------------------------------|----------------------------------------|----------|
| `uuid-item-1`                          | `uuid-1`                            | `uuid-burger`                          | 1        |
| `uuid-item-2`                          | `uuid-1`                            | `uuid-fries`                           | 1        |
| `uuid-item-3`                          | `uuid-1`                            | `uuid-soft-drink`                      | 1        |

---

### **Advanced Features to Add Later:**

1. **Combo Variants**: Allow different versions of a combo deal (e.g., "Small Combo," "Large Combo").
2. **Dynamic Pricing**: Special pricing based on time of day (e.g., happy hour combos).
3. **Schedule/Availability**: Allow vendors to make certain combos available only at specific times (e.g., breakfast combos).
4. **Combo Discounts**: Option to apply further discounts or coupons on top of the combo price.

---

### **API Example for Combo Deals**

Here’s an example API endpoint to fetch a combo deal with all the associated items:

```javascript
const getComboDeal = async (req, res) => {
  const { comboId } = req.params;

  // Fetch the combo deal
  const comboQuery = `
    SELECT combo_name, combo_description, combo_price 
    FROM combo_deals 
    WHERE combo_id = ?
  `;
  const comboDeal = await dbConnection.query(comboQuery, [comboId]);

  // Fetch the items associated with the combo deal
  const itemsQuery = `
    SELECT mi.item_name, ci.quantity 
    FROM combo_items ci 
    JOIN menu_items mi ON ci.item_id = mi.item_id 
    WHERE ci.combo_id = ?
  `;
  const comboItems = await dbConnection.query(itemsQuery, [comboId]);

  // Combine combo deal and its items
  const response = {
    comboDeal: comboDeal[0],
    items: comboItems[0]
  };

  res.status(200).json(response);
};
```

### **Conclusion**

The **Combo Deals Table** is essential for vendors who want to create bundled deals and offers, which are common in cafes, restaurants, and hotels. It helps increase sales by offering discounted packages and encourages customers to purchase more items together. The combo deal can be flexible, allowing different quantities of items, different types of items, and can be enhanced with features like scheduling and special pricing rules.