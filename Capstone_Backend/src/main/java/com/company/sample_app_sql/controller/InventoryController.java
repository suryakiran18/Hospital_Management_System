package com.company.sample_app_sql.controller;

import com.company.sample_app_sql.entity.Inventory;
import com.company.sample_app_sql.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // Create Item
    @PostMapping("/create")
    public ResponseEntity<Inventory> createItem(@RequestBody Inventory inventory) {
        if (inventoryService.existsById(inventory.getItemId())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); // Item already exists
        }
        Inventory createdInventory = inventoryService.saveOrUpdateItem(inventory);
        return new ResponseEntity<>(createdInventory, HttpStatus.CREATED);
    }

    // Update an existing inventory item
    @PutMapping("/update/{itemId}")
    public ResponseEntity<Inventory> updateItem(@PathVariable Integer itemId, @RequestBody Inventory inventory) {
        if (!inventoryService.existsById(itemId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Item does not exist
        }
        inventory.setItemId(itemId); // Ensure the ID is consistent with the path variable
        Inventory updatedInventory = inventoryService.saveOrUpdateItem(inventory);
        return new ResponseEntity<>(updatedInventory, HttpStatus.OK);
    }

    // Get All Items
    @GetMapping("/all")
    public ResponseEntity<List<Inventory>> getAllItems() {
        List<Inventory> items = inventoryService.getAllItems();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // Get Item by ID
    @GetMapping("/{itemId}")
    public ResponseEntity<Inventory> getItemById(@PathVariable Integer itemId) {
        return inventoryService.getItemById(itemId)
                .map(item -> new ResponseEntity<>(item, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Delete Item by ID
    @DeleteMapping("/delete/{itemId}")
    public ResponseEntity<String> deleteItem(@PathVariable Integer itemId) {
        if (!inventoryService.getItemById(itemId).isPresent()) {
            return new ResponseEntity<>("Item not found", HttpStatus.NOT_FOUND);
        }
        inventoryService.deleteItem(itemId);
        return new ResponseEntity<>("Item deleted successfully", HttpStatus.OK);
    }
}
