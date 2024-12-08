package com.company.sample_app_sql.service;

import com.company.sample_app_sql.entity.Inventory;
import com.company.sample_app_sql.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    // Create or Update Item
    public Inventory saveOrUpdateItem(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    // Get All Items
    public List<Inventory> getAllItems() {
        return inventoryRepository.findAll();
    }

    // Get Item by ID
    public Optional<Inventory> getItemById(Integer itemId) {
        return inventoryRepository.findById(itemId);
    }

    // Delete Item by ID
    public void deleteItem(Integer itemId) {
        inventoryRepository.deleteById(itemId);
    }

    public boolean existsById(Integer itemId) {
        return inventoryRepository.existsById(itemId);
    }
}
